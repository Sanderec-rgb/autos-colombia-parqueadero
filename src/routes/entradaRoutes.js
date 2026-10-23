const express = require('express');
const router = express.Router();
const EntradaController = require('../controllers/EntradaController');
const { verificarToken } = require('../middleware/auth');

router.post('/', verificarToken, EntradaController.registrar);

module.exports = router;