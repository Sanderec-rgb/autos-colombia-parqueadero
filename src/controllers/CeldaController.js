const CeldaRepository = require('../repositories/CeldaRepository');

class CeldaController {
  async listar(req, res) {
    try {
      const celdas = await CeldaRepository.listarTodas();
      res.json(celdas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async libres(req, res) {
    try {
      const { tipo } = req.query;
      const celdas = tipo
        ? await CeldaRepository.findLibresByTipo(tipo)
        : await CeldaRepository.listarTodas();
      res.json(celdas.filter((c) => c.estado === 'LIBRE'));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = new CeldaController();