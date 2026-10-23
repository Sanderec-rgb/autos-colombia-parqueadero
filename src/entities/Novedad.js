class Novedad {
  constructor({ id_novedad, id_movimiento, descripcion, fecha, id_usuario }) {
    this.idNovedad = id_novedad;
    this.idMovimiento = id_movimiento;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.idUsuario = id_usuario;
  }
  validar() {
    if (!this.descripcion || this.descripcion.trim().length < 5) {
      throw new Error('La descripcion es obligatoria');
    }
    return true;
  }
}
module.exports = Novedad;