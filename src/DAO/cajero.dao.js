const { pool } = require('../DB/db');

module.exports = {
  async getById(cajeroId) {
    // Esquema: montoDisponible DECIMAL(10,2)
    const [rows] = await pool.query('SELECT idCajero, ubicacion, montoDisponible FROM cajero WHERE idCajero = ?', [cajeroId]);
    if (!rows.length) throw new Error('Cajero no encontrado');
    return rows[0];
  },

  async retirarEfectivo(cajeroId, monto) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [rows] = await conn.query('SELECT montoDisponible FROM cajero WHERE idCajero = ? FOR UPDATE', [cajeroId]);
        if (!rows.length) throw new Error('Cajero no encontrado');
        const disponible = rows[0].montoDisponible;
        if (disponible < monto) throw new Error('Cajero sin efectivo suficiente');
        await conn.query('UPDATE cajero SET montoDisponible = montoDisponible - ? WHERE idCajero = ?', [monto, cajeroId]);
      await conn.commit();
  return true;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
};