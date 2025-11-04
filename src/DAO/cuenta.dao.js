const { pool } = require('../DB/db');

module.exports = {
  async getSaldoByCuentaId(cuentaId) {
    const [rows] = await pool.query('SELECT saldo FROM cuenta WHERE idCuenta = ?', [cuentaId]);
    if (!rows.length) throw new Error('Cuenta no encontrada');
    return rows[0].saldo;
  },

  async getByTarjeta(numeroTarjeta) {
    const [rows] = await pool.query('SELECT idCuenta, numeroTarjeta, saldo, nip, banco FROM cuenta WHERE numeroTarjeta = ?', [numeroTarjeta]);
    if (!rows.length) throw new Error('Cuenta no encontrada');
    return rows[0];
  },

  async retirarSaldo(cuentaId, monto) {
    // Realiza la operación en una transacción por seguridad
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [rows] = await conn.query('SELECT saldo FROM cuenta WHERE idCuenta = ? FOR UPDATE', [cuentaId]);
      if (!rows.length) throw new Error('Cuenta no encontrada');
      const saldo = rows[0].saldo;
      if (saldo < monto) throw new Error('Saldo insuficiente');
      await conn.query('UPDATE cuenta SET saldo = saldo - ? WHERE idCuenta = ?', [monto, cuentaId]);
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
};