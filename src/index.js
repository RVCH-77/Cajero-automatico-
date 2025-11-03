const { pool } = require('./db');

(async () => {
  console.log('Cajero Automático iniciado');
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT 1 AS ok');
    console.log('Conexión MySQL OK:', rows[0].ok);
  } catch (err) {
    console.error('No se pudo conectar a MySQL:', err.message);
    console.log('Revisa tu .env: DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT');
  } finally {
    if (conn) conn.release();
    process.exit(0);
  }
})();