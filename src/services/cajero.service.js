const cuentaDao = require('../DAO/cuenta.dao');
const cajeroDao = require('../DAO/cajero.dao');
const authService = require('./auth.service');
const interbankService = require('./ApiExterna');

module.exports = {
  async obtenerSaldo(cuentaId) {
    return cuentaDao.getSaldoByCuentaId(cuentaId);
  },

  async retirarLocal({ numeroTarjeta, nip, monto, cajeroId }) {
    if (monto <= 0) throw new Error('Monto inválido');
    const cajero = await cajeroDao.getById(cajeroId);
    if (cajero.montoDisponible < monto) throw new Error('Cajero sin efectivo suficiente');

    const cuenta = await authService.validarCredenciales(numeroTarjeta, nip);
    if (cuenta.saldo < monto) throw new Error('Saldo insuficiente');

    await cuentaDao.retirarSaldo(cuenta.idCuenta, monto);
    await cajeroDao.retirarEfectivo(cajeroId, monto);
    const saldoNuevo = await cuentaDao.getSaldoByCuentaId(cuenta.idCuenta);
    return { ok: true, tipo: 'local', cuentaId: cuenta.idCuenta, monto, saldoNuevo };
  },

  async retirarInterbancario({ numeroTarjeta, nip, monto, cajeroId }) {
    if (monto <= 0) throw new Error('Monto inválido');
    const cajero = await cajeroDao.getById(cajeroId);
    if (cajero.montoDisponible < monto) throw new Error('Cajero sin efectivo suficiente');

    // Consulta saldos y datos en sistema de mi compañero 
    const consulta = await interbankService.consultarCuentaCompanero({ numeroTarjeta });
    if (typeof consulta?.saldo === 'number' && consulta.saldo < monto) {
      throw new Error('Saldo insuficiente en banco externo');
    }

    // Solicita débito en sistema del compañero
    await interbankService.debitarCuentaCompanero({ numeroTarjeta, nip, monto });

    // Dispensa efectivo localmente
    await cajeroDao.retirarEfectivo(cajeroId, monto);
    return { ok: true, tipo: 'interbancaria', monto };
  },

  async retirar(payload) {
    const { esOtroBanco } = payload;
    if (esOtroBanco) {
      return this.retirarInterbancario(payload);
    }
    return this.retirarLocal(payload);
  }
};