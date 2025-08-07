/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("rifas", {
    numero: { type: "integer", primaryKey: true },
    reservado: { type: "boolean", notNull: true, default: false },
    reservado_por: { type: "text" },
    data_reserva: { type: "timestamp" },
  });

  pgm.sql("INSERT INTO rifas (numero) SELECT generate_series(1,100);");
};

exports.down = (pgm) => {
  pgm.dropTable("rifas");
};
