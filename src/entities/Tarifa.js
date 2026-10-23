class Tarifa {
  constructor({ id_tarifa, tipo_vehiculo, valor_hora, valor_dia, valor_mensualidad, vigencia_desde, vigencia_hasta }) {
    this.idTarifa = id_tarifa;
    this.tipoVehiculo = tipo_vehiculo;
    this.valorHora = valor_hora;
    this.valorDia = valor_dia;
    this.valorMensual = valor_mensualidad;
    this.vigenciaDesde = vigencia_desde;
    this.vigenciaHasta = vigencia_hasta;
  }
  calcularValor(horas) {
    if (horas >= 24) {
      return Math.ceil(horas / 24) * Number(this.valorDia);
    }
    return horas * Number(this.valorHora);
  }
}
module.exports = Tarifa;