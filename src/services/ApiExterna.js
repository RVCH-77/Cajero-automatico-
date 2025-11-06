const axios = require('axios');

const Companero_API_URL = process.env.Companero_API_URL || '';

module.exports = {
  async debitarCuentaCompanero({ numeroTarjeta, nip, monto }) {
    if (!Companero_API_URL) throw new Error('Companero_API_URL no configurado');
    const url = `${Companero_API_URL}/api/cajero/retirar`;
    const { data } = await axios.post(url, { numeroTarjeta, nip, monto, esOtroBanco: false });
    if (!data || data.ok !== true) {
      throw new Error(data?.error || 'Error en retiro interbancario (compañero)');
    }
    return data;
  },

  // Nueva función: consulta saldo/datos de la cuenta en el sistema compañero
  async consultarCuentaCompanero({ numeroTarjeta }) {
    if (!Companero_API_URL) throw new Error('Companero_API_URL no configurado');
    const url = `${Companero_API_URL}/api/cajero/consulta`;
    const { data } = await axios.post(url, { numeroTarjeta });
    if (!data || data.ok !== true) {
      throw new Error(data?.error || 'Error en consulta interbancaria (compañero)');
    }
    return data; // se espera { ok: true, saldo: number, banco?: string, ... }
  }
};