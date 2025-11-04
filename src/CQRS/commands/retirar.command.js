const cajeroService = require('../../services/cajero.service');
const transaccionService = require('../../services/transaccion.service');

module.exports = {
  async execute(payload) {
    const { numeroTarjeta, monto, esOtroBanco } = payload;
    const tipo = esOtroBanco ? 'interbancaria' : 'local';
    try {
      const resultado = await cajeroService.retirar(payload);
      await transaccionService.registrarRetiro({ numeroTarjeta, monto, tipo, estatus: 'exitosa', mensaje: 'OK' });
      return { ok: true, ...resultado };
    } catch (err) {
      // Registrar intento fallido
      try {
        await transaccionService.registrarRetiro({ numeroTarjeta, monto, tipo, estatus: 'rechazada', mensaje: err.message });
      } catch (_) {}
      throw err;
    }
  }
};