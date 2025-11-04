const cajeroService = require('../../services/cajero.service');

module.exports = {
  async execute({ cuentaId }) {
    return cajeroService.obtenerSaldo(cuentaId);
  }
};