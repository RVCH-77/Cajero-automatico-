const axios = require('axios');

const COMPANION_API_URL = process.env.COMPANION_API_URL || '';

module.exports = {
  async debitarCuentaCompanero({ numeroTarjeta, nip, monto }) {
    if (!COMPANION_API_URL) throw new Error('COMPANION_API_URL no configurado');
    const url = `${COMPANION_API_URL}/api/cajero/retirar`;
    const { data } = await axios.post(url, { numeroTarjeta, nip, monto, esOtroBanco: false });
    if (!data || data.ok !== true) {
      throw new Error(data?.error || 'Error en retiro interbancario (compañero)');
    }
    return data;
  }
};