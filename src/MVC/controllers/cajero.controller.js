const cajeroService = require('../../services/cajero.service');
const retirarCommand = require('../../CQRS/commands/retirar.command');
const saldoQuery = require('../../CQRS/queries/saldo.query');

module.exports = {
  async obtenerSaldo(req, res) {
    try {
      const cuentaId = parseInt(req.params.cuentaId, 10);
      const saldo = await saldoQuery.execute({ cuentaId });
      res.json({ cuentaId, saldo });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async retirar(req, res) {
    try {
      const { numeroTarjeta, nip, monto, cajeroId, esOtroBanco } = req.body;
      const resultado = await retirarCommand.execute({ numeroTarjeta, nip, monto, cajeroId, esOtroBanco });
      res.json(resultado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};