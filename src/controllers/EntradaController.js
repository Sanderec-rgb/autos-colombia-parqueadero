const EntradaService = require('../services/EntradaService');

class EntradaController {
  async registrar(req, res) {
    try {
      const { placa, tipo, marca, modelo, color, idCelda } = req.body;
      if (!placa || !tipo || !idCelda) {
        return res.status(400).json({ error: 'placa, tipo e idCelda son obligatorios' });
      }
      const resultado = await EntradaService.registrarEntrada({
        placa, tipo, marca, modelo, color, idCelda,
        idUsuario: req.usuario.id,
      });
      res.status(201).json(resultado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
module.exports = new EntradaController();