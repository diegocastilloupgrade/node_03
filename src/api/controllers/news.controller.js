const { deleteFile } = require('../../middlewares/deleteFile');
const News = require('../models/news.model');

const HTTPSTATUSCODE = require('../../utils/httpStatusCode');

const getAllNews = async (req, res, next) => {
  try {
    const allNews = await News.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      news: allNews,
    });
  } catch (error) {
    return next(error);
  }
};

const getNewsByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newsByID = await News.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      news: newsByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createNews = async (req, res, next) => {
  try {
    const newNews = new News(req.body);
    if (req.file) {
      newNews.picture = req.file.path;
    }
    const createdNews = newNews.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      createdNews: newNews,
    });
  } catch (error) {
    return next(error);
  }
};

const patchNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchNews = new News(req.body);
    patchNews._id = id;
    const newsDB = await News.findByIdAndUpdate(id, patchNews);
    //Si mi anterior newsDB.picture tiene una foto, entra y ejecuta la función de borrado.
    if (newsDB.picture) {
      deleteFile(newsDB.picture);
    }
    //Comprueba si estoy metiendo una nueva y si es así la mete
    if (req.file) {
      newsDB.picture = req.file.path;
    }
    if (!newsDB) {
      return next(setError(404, 'Info not found'));
    }
    return res.status(200).json({ nuevaNew: patchNews, viejaNew: newsDB });
  } catch (error) {}
};
module.exports = { getAllNews, getNewsByID, createNews, patchNews };
