class Usuario {
  constructor({ id_usuario, nombre, documento, usuario, password_hash, rol, estado }) {
    this.idUsuario = id_usuario;
    this.nombre = nombre;
    this.documento = documento;
    this.usuario = usuario;
    this.passwordHash = password_hash;
    this.rol = rol;
    this.estado = estado;
  }
  puedeRegistrar() {
    return this.rol === 'ADMIN' || this.rol === 'OPERADOR';
  }
}
module.exports = Usuario;