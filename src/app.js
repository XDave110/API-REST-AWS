const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.use(bodyParser.json());


const alumnoRoutes = require('./routes/alumnoRoutes');
const profesorRoutes = require('./routes/profesorRoutes');

app.use(alumnoRoutes);
app.use(profesorRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor.' });
});

app.listen(port, host, () => {
  console.log(`Servidor en ejecución en http://${host}:${port}`);
});