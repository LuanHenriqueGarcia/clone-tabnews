import database from "infra/database.js";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    return response
      .status(405)
      .json({ error: `method "${request.method}" not allowed` });
  }

  try {
    const { rows } = await database.query(
      "SELECT numero, reservado FROM rifas ORDER BY numero;",
    );
    return response.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "failed to list numbers" });
  }
}
