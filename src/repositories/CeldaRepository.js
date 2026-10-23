const db = require('../config/database');

class CeldaRepository {
  async findById(id) {
    const { rows } = await db.query('SELECT * FROM celda WHERE id_celda = $1', [id]);
    return rows[0] || null;
  }

  async findByCodigo(codigo) {
    const { rows } = await db.query('SELECT * FROM celda WHERE codigo = $1', [codigo]);
    return rows[0] || null;
  }

  async findLibresByTipo(tipo) {
    const { rows } = await db.query(
      `SELECT * FROM celda WHERE estado = 'LIBRE' AND tipo = $1 ORDER BY codigo`,
      [tipo]
    );
    return rows;
  }

  async updateEstado(idCelda, estado) {
    const { rows } = await db.query(
      'UPDATE celda SET estado = $1 WHERE id_celda = $2 RETURNING *',
      [estado, idCelda]
    );
    return rows[0];
  }

  async listarTodas() {
    const { rows } = await db.query('SELECT * FROM celda ORDER BY codigo');
    return rows;
  }
}
module.exports = new CeldaRepository();