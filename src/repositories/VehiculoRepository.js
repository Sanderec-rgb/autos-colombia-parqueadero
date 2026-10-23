const db = require('../config/database');

class VehiculoRepository {
  async findByPlaca(placa) {
    const { rows } = await db.query('SELECT * FROM vehiculo WHERE placa = $1', [placa]);
    return rows[0] || null;
  }

  async create({ placa, tipo, marca, modelo, color, idUsuario }) {
    const { rows } = await db.query(
      `INSERT INTO vehiculo (placa, tipo, marca, modelo, color, id_usuario)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [placa, tipo, marca, modelo, color, idUsuario]
    );
    return rows[0];
  }

  async findOrCreate({ placa, tipo, marca, modelo, color, idUsuario }) {
    const existente = await this.findByPlaca(placa);
    if (existente) return existente;
    return this.create({ placa, tipo, marca, modelo, color, idUsuario });
  }
}
module.exports = new VehiculoRepository();