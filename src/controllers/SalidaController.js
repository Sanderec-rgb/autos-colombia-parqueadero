const SalidaService = require('../services/SalidaService');

class SalidaController {
  async registrar(req, res) {
    try {
      const { placa } = req.body;
      if (!placa) return res.status(400).json({ error: 'placa es obligatoria' });
      const resultado = await SalidaService.registrarSalida({ placa });
      res.json(resultado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
module.exports = new SalidaController();