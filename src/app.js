const path = require('path');
const express = require('express');

const cajeroRoutes = require('./routes/cajero.routes');
const bancoRoutes = require('./routes/banco.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Views (MVC)
app.set('views', path.join(__dirname, 'MVC', 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/cajero', cajeroRoutes);
app.use('/api/banco', bancoRoutes);

// Página principal (SSR)
app.get('/', (req, res) => {
  res.render('index', { title: 'Cajero Automático' });
});

module.exports = app;