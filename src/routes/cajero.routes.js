const express = require('express');
const router = express.Router();
const cajeroController = require('../MVC/controllers/cajero.controller');

router.get('/saldo/:cuentaId', cajeroController.obtenerSaldo);
router.post('/retirar', cajeroController.retirar);

module.exports = router;