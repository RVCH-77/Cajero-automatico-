class CuentaModel {
  constructor({ id, clienteId, saldo }) {
    this.id = id;
    this.clienteId = clienteId;
    this.saldo = saldo;
  }
}

module.exports = CuentaModel;