import database from "infra/database.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response
      .status(405)
      .json({ error: `method "${request.method}" not allowed` });
  }

  const numero = parseInt(request.query.numero, 10);
  const reservadoPor = request.body?.reservado_por || null;

  let client;
  try {
    client = await database.getNewClient();
    await client.query("BEGIN");
    const selectResult = await client.query({
      text: "SELECT numero FROM rifas WHERE numero = $1 AND reservado = false FOR UPDATE",
      values: [numero],
    });

    if (selectResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return response
        .status(409)
        .json({ error: "Número já reservado ou inexistente" });
    }

    await client.query({
      text: "UPDATE rifas SET reservado = true, reservado_por = $1, data_reserva = NOW() WHERE numero = $2",
      values: [reservadoPor, numero],
    });
    await client.query("COMMIT");
    return response.status(200).json({ numero, reservado: true });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error(error);
    return response.status(500).json({ error: "Falha ao reservar número" });
  } finally {
    if (client) {
      await client.end();
    }
  }
}
