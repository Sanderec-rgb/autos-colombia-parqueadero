const express = require('express');
const router = express.Router();
const SalidaController = require('../controllers/SalidaController');
const { verificarToken } = require('../middleware/auth');

router.post('/', verificarToken, SalidaController.registrar);

module.exports = router;