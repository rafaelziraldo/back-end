const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/tipoGasto', require('./routes/tipoGasto') );
app.use('/api/tipoIngreso', require('./routes/tipoIngreso') );
app.use('/api/ingreso', require('./routes/ingreso') );
app.use('/api/gasto', require('./routes/egreso') );
app.use('/api/dashboard', require('./routes/dashboard') );
// TODO: CRUD: Eventos



// Escuchar peticiones
app.listen( 4000, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});






