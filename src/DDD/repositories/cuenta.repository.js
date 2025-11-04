const cuentaDao = require('../../DAO/cuenta.dao');
const Cuenta = require('../entities/cuenta.entity');

module.exports = {
  async findById(id) {
    const saldo = await cuentaDao.getSaldoByCuentaId(id);
    return new Cuenta({ id, clienteId: null, saldo });
  }
};