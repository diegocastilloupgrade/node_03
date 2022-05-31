//Importamos las tres librerias necesarias para usar cloudinary
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
//CloudinaryStorage es una funcion que viene en la librería multer-storage-cloudinary y la recogemos con el destructuring
const { CloudinaryStorage } = require('multer-storage-cloudinary');
//ESta función necesita un objeto por parámetro
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  //carpeta que genero en cloudinary
  params: {
    folder: 'news',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  },
});
const upload = multer({ storage });

module.exports = upload;
