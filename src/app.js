const express = require('express');
const cors = require('cors');
require('dotenv').config();

const entradaRoutes = require('./routes/entradaRoutes');
const salidaRoutes = require('./routes/salidaRoutes');
const celdaRoutes = require('./routes/celdaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ servicio: 'Parqueadero Autos Colombia', version: '1.0.0', estado: 'OK' });
});

app.use('/api/entradas', entradaRoutes);
app.use('/api/salidas', salidaRoutes);
app.use('/api/celdas', celdaRoutes);

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log('Servidor corriendo en http://localhost:' + PORT));
}

module.exports = app;