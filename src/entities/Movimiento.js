class Movimiento {
  constructor({ id_movimiento, id_vehiculo, id_celda, id_usuario, fecha_entrada, fecha_salida, valor_pagado, estado }) {
    this.idMovimiento = id_movimiento;
    this.idVehiculo = id_vehiculo;
    this.idCelda = id_celda;
    this.idUsuario = id_usuario;
    this.fechaEntrada = fecha_entrada;
    this.fechaSalida = fecha_salida;
    this.valorPagado = valor_pagado;
    this.estado = estado;
  }
  calcularTiempoHoras() {
    const fin = this.fechaSalida ? new Date(this.fechaSalida) : new Date();
    const inicio = new Date(this.fechaEntrada);
    return Math.ceil((fin - inicio) / (1000 * 60 * 60));
  }
  calcularValor(tarifa) {
    const horas = this.calcularTiempoHoras();
    if (horas >= 24) {
      return Math.ceil(horas / 24) * Number(tarifa.valor_dia);
    }
    return horas * Number(tarifa.valor_hora);
  }
  cerrar() {
    this.estado = 'CERRADO';
    this.fechaSalida = new Date();
  }
}
module.exports = Movimiento;