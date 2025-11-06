const cajeroService = require('../../services/cajero.service');
const retirarCommand = require('../../CQRS/commands/retirar.command');
const saldoQuery = require('../../CQRS/queries/saldo.query');
const cuentaDao = require('../../DAO/cuenta.dao');

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

  async obtenerSaldoPorTarjeta(req, res) {
    try {
      const numeroTarjetaRaw = String(req.params.numeroTarjeta || '');
      const numeroTarjeta = numeroTarjetaRaw.replace(/\D/g, '');
      const cuenta = await cuentaDao.getByTarjeta(numeroTarjeta);
      res.json({ numeroTarjeta, saldo: cuenta.saldo, idCuenta: cuenta.idCuenta, banco: cuenta.banco });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async obtenerSaldoPorTarjetaPost(req, res) {
    try {
      const numeroTarjetaRaw = String((req.body?.numeroTarjeta) || '');
      const numeroTarjeta = numeroTarjetaRaw.replace(/\D/g, '');
      const cuenta = await cuentaDao.getByTarjeta(numeroTarjeta);
      res.json({ numeroTarjeta, saldo: cuenta.saldo, idCuenta: cuenta.idCuenta, banco: cuenta.banco });
    } catch (err) {
      res.status(404).json({ error: err.message });
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
  }
};