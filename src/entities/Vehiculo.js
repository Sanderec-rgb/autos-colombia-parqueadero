class Vehiculo {
  constructor({ id_vehiculo, placa, tipo, marca, modelo, color, id_usuario }) {
    this.idVehiculo = id_vehiculo;
    this.placa = placa;
    this.tipo = tipo;
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.idUsuario = id_usuario;
  }
  validar() {
    if (!this.placa || this.placa.length < 5) {
      throw new Error('La placa es invalida');
    }
    if (!['CARRO', 'MOTO', 'BICICLETA'].includes(this.tipo)) {
      throw new Error('Tipo de vehiculo invalido');
    }
    return true;
  }
}
module.exports = Vehiculo;