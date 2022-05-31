const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/file');

//Importamos el middleware de autorización
const { isAuth } = require('../../middlewares/auth.middleware');

const {
  getAllJournalist,
  getJournalistByID,
  createJournalist,
} = require('../controllers/journalist.controller');

router.get('/', getAllJournalist);
router.get('/:id', getJournalistByID);
//router.post('/', [isAuth], createJournalist);
router.post('/', [isAuth], upload.single("picture"), createJournalist)

module.exports = router;
