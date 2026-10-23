const MovimientoRepository = require('../repositories/MovimientoRepository');
const CeldaRepository = require('../repositories/CeldaRepository');
const VehiculoRepository = require('../repositories/VehiculoRepository');
const Vehiculo = require('../entities/Vehiculo');

class EntradaService {
  async registrarEntrada({ placa, tipo, marca, modelo, color, idCelda, idUsuario }) {
    const v = new Vehiculo({ placa, tipo, marca, modelo, color });
    v.validar();

    const activo = await MovimientoRepository.findActivoByPlaca(placa);
    if (activo) throw new Error('El vehiculo ya se encuentra dentro del parqueadero.');

    const celda = await CeldaRepository.findById(idCelda);
    if (!celda || celda.estado !== 'LIBRE') throw new Error('La celda no esta disponible.');
    if (celda.tipo !== tipo) throw new Error('La celda ' + celda.codigo + ' no es para ' + tipo);

    const vehiculo = await VehiculoRepository.findOrCreate({ placa, tipo, marca, modelo, color, idUsuario });
    const movimiento = await MovimientoRepository.create({
      idVehiculo: vehiculo.id_vehiculo,
      idCelda: celda.id_celda,
      idUsuario,
    });
    await CeldaRepository.updateEstado(celda.id_celda, 'OCUPADA');
    return { mensaje: 'Entrada registrada correctamente', movimiento, celda: { ...celda, estado: 'OCUPADA' } };
  }
}
module.exports = new EntradaService();