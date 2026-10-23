const db = require('../config/database');

class MovimientoRepository {
  async findActivoByPlaca(placa) {
    const { rows } = await db.query(
      `SELECT m.*, v.placa, v.tipo FROM movimiento m
       JOIN vehiculo v ON v.id_vehiculo = m.id_vehiculo
       WHERE v.placa = $1 AND m.estado = 'ACTIVO'`,
      [placa]
    );
    return rows[0] || null;
  }

  async findById(id) {
    const { rows } = await db.query('SELECT * FROM movimiento WHERE id_movimiento = $1', [id]);
    return rows[0] || null;
  }

  async create({ idVehiculo, idCelda, idUsuario }) {
    const { rows } = await db.query(
      `INSERT INTO movimiento (id_vehiculo, id_celda, id_usuario, estado)
       VALUES ($1, $2, $3, 'ACTIVO') RETURNING *`,
      [idVehiculo, idCelda, idUsuario]
    );
    return rows[0];
  }

  async cerrar(idMovimiento, valorPagado) {
    const { rows } = await db.query(
      `UPDATE movimiento SET fecha_salida = CURRENT_TIMESTAMP,
       valor_pagado = $1, estado = 'CERRADO'
       WHERE id_movimiento = $2 RETURNING *`,
      [valorPagado, idMovimiento]
    );
    return rows[0];
  }

  async historial({ placa, desde, hasta }) {
    let sql = `SELECT m.*, v.placa, v.tipo, c.codigo AS celda
               FROM movimiento m
               JOIN vehiculo v ON v.id_vehiculo = m.id_vehiculo
               JOIN celda c ON c.id_celda = m.id_celda
               WHERE 1=1`;
    const params = [];
    if (placa) { params.push(placa); sql += ` AND v.placa = $${params.length}`; }
    if (desde) { params.push(desde); sql += ` AND m.fecha_entrada >= $${params.length}`; }
    if (hasta) { params.push(hasta); sql += ` AND m.fecha_entrada <= $${params.length}`; }
    sql += ' ORDER BY m.fecha_entrada DESC';
    const { rows } = await db.query(sql, params);
    return rows;
  }
}
module.exports = new MovimientoRepository();