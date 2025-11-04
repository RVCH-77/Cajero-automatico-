const bcrypt = require('bcryptjs');
const cuentaDao = require('../DAO/cuenta.dao');

function isBcryptHash(str) {
  return typeof str === 'string' && /^\$2[aby]\$\d{2}\$/.test(str);
}

module.exports = {
  async validarCredenciales(numeroTarjeta, nipIngresado) {
    // Normaliza el número de tarjeta (elimina espacios y guiones)
    const tarjeta = String(numeroTarjeta || '').replace(/\D/g, '');
    const cuenta = await cuentaDao.getByTarjeta(tarjeta);
    if (!cuenta) throw new Error('Credenciales inválidas');

    const nipDb = String(cuenta.nip || '');
    const nipIn = String(nipIngresado || '');

    let ok = false;
    if (isBcryptHash(nipDb)) {
      ok = await bcrypt.compare(nipIn, nipDb);
    } else {
      // Fallback temporal: comparación en texto plano si el NIP no está hasheado
      ok = nipDb === nipIn;
    }

    if (!ok) throw new Error('Credenciales inválidas');
    return cuenta; // { idCuenta, numeroTarjeta, saldo, nip, banco }
  }
};