const express = require('express');
const router = express.Router();

const upload = require('../../middlewares/file');

//Importamos el middleware de autorización
const { isAuth } = require('../../middlewares/auth.middleware');

const {
  getAllNews,
  getNewsByID,
  createNews,
} = require('../controllers/news.controller');

router.get('/', getAllNews);
router.get('/:id', getNewsByID);
//router.post('/', [isAuth], createNews);
router.post('/', [isAuth], upload.single("picture"), createNews);

module.exports = router;
