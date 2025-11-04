require('dotenv').config();
const app = require('./app');

const PORT = parseInt(process.env.PORT || '3000', 10);

const server = app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`;
  console.log(`Servidor del Cajero corriendo en ${url}`);
});

process.on('SIGINT', () => {
  console.log('Cerrando servidor (SIGINT)');
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  console.log('Cerrando servidor (SIGTERM)');
  server.close(() => process.exit(0));
});