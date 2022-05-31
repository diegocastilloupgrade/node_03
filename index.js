const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('morgan');

//Routers
const newsRouter = require('./src/api/routes/news.routes');
const journalistRouter = require('./src/api/routes/journalist.routes');
const userRouter = require('./src/api/routes/users.routes');
const cloudinary = require('cloudinary').v2;

dotenv.config();

const { connect } = require('./src/utils/database');
connect();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const PORT = process.env.PORT || 5000;

//Recuperamos la clave secreta del dotenv
const JWT_SECRET = process.env.JWT_SECRET;

const server = express();

//USAMOS MORGAN PARA PODER VER UN LOG DE LAS PETICIONES QUE REALIZAMOS CUANDO ESTEMOS BAJO EL SCRIPT DEV
server.use(logger('dev'));

//HEADERS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//CORS
server.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

//CONFIGURAMOS LA CODIFICACION DE EXPRESS PARA RECIBIR INFORMACION EN JSON
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//SETEAMOS LA CLAVE SECRETA QUE ME PIDE LA AUTENTICACION (EL LOGIN);
server.set('secretKey', JWT_SECRET);

//USAMOS LOS ROUTERS
server.use('/news', newsRouter);
server.use('/journalist', journalistRouter);
server.use('/users', userRouter);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
