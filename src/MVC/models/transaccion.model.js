class TransaccionModel {
  constructor({ id, cuentaId, tipo, monto, fecha }) {
    this.id = id;
    this.cuentaId = cuentaId;
    this.tipo = tipo; // retiro, deposito
    this.monto = monto;
    this.fecha = fecha || new Date();
  }
}

module.exports = TransaccionModel;