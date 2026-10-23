class Celda {
  constructor({ id_celda, codigo, tipo, estado, ubicacion }) {
    this.idCelda = id_celda;
    this.codigo = codigo;
    this.tipo = tipo;
    this.estado = estado;
    this.ubicacion = ubicacion;
  }
  estaLibre() {
    return this.estado === 'LIBRE';
  }
  asignar() {
    if (!this.estaLibre()) throw new Error('La celda no esta disponible');
    this.estado = 'OCUPADA';
  }
  liberar() {
    this.estado = 'LIBRE';
  }
}
module.exports = Celda;