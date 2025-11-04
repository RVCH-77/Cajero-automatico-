const express = require('express');
const router = express.Router();

// Rutas de ejemplo para interconexión entre bancos
router.get('/ping', (req, res) => {
  res.json({ ok: true, message: 'Banco OK' });
});

module.exports = router;