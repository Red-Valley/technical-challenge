const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

// Importamos las rutas
const postRoutes = require('../Routes/Post-routes/post');
const getRoutes = require('../Routes/Get-routes/get');
const putRoutes = require('../Routes/Put-routes/Put');

app.use('/api', postRoutes);
app.use('/api', putRoutes);
app.use('/api', getRoutes);


module.exports = app;
