const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Token requerido' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.usuario = { id: payload.id, rol: payload.rol };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalido o expirado' });
  }
}

function soloAdmin(req, res, next) {
  if (req.usuario && req.usuario.rol !== 'ADMIN') {
    return res.status(403).json({ error: 'Acceso restringido a administradores' });
  }
  next();
}

module.exports = { verificarToken, soloAdmin };