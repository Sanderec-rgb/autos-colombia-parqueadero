const MovimientoRepository = require('../repositories/MovimientoRepository');
const CeldaRepository = require('../repositories/CeldaRepository');
const TarifaService = require('./TarifaService');
const Movimiento = require('../entities/Movimiento');

class SalidaService {
  async registrarSalida({ placa }) {
    const mov = await MovimientoRepository.findActivoByPlaca(placa);
    if (!mov) throw new Error('No existe un movimiento activo para esta placa.');

    const m = new Movimiento(mov);
    m.cerrar();
    const horas = m.calcularTiempoHoras();
    const valor = await TarifaService.calcular(mov.tipo, horas);
    const cerrado = await MovimientoRepository.cerrar(mov.id_movimiento, valor);
    await CeldaRepository.updateEstado(mov.id_celda, 'LIBRE');

    return {
      mensaje: 'Salida registrada correctamente',
      placa,
      fechaEntrada: mov.fecha_entrada,
      fechaSalida: cerrado.fecha_salida,
      horas,
      valorPagado: valor,
    };
  }
}
module.exports = new SalidaService();