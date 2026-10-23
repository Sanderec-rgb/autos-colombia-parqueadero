const db = require('../config/database');

class TarifaService {
  async obtenerTarifa(tipoVehiculo) {
    const { rows } = await db.query(
      `SELECT * FROM tarifa WHERE tipo_vehiculo = $1
       AND (vigencia_hasta IS NULL OR vigencia_hasta >= CURRENT_DATE)
       ORDER BY vigencia_desde DESC LIMIT 1`,
      [tipoVehiculo]
    );
    if (!rows[0]) throw new Error('No hay tarifa vigente para ' + tipoVehiculo);
    return rows[0];
  }

  async calcular(tipoVehiculo, horas) {
    const tarifa = await this.obtenerTarifa(tipoVehiculo);
    if (horas >= 24) {
      return Math.ceil(horas / 24) * Number(tarifa.valor_dia);
    }
    return Number(tarifa.valor_hora) * horas;
  }
}
module.exports = new TarifaService();