const express = require('express');
const router = express.Router();
const CeldaController = require('../controllers/CeldaController');
const { verificarToken } = require('../middleware/auth');

router.get('/', verificarToken, CeldaController.listar);
router.get('/libres', verificarToken, CeldaController.libres);

module.exports = router;