const { pool } = require('../DB/db');

module.exports = {
  async registrarRetiro({ numeroTarjeta, monto, tipo, estatus = 'exitosa', mensaje = '' }) {
    const sql = 'INSERT INTO transaccion (numeroTarjeta, monto, tipo, estatus, mensaje) VALUES (?, ?, ?, ?, ?)';
    await pool.query(sql, [numeroTarjeta, monto, tipo, estatus, mensaje]);
    return true;
  }
};