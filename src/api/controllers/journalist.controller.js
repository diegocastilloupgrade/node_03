const { deleteFile } = require('../../middlewares/deleteFile');
const journalist = require('../models/journalist.model');

const HTTPSTATUSCODE = require('../../utils/httpStatusCode');
const Journalist = require('../models/journalist.model');

const getAllJournalist = async (req, res, next) => {
  try {
    const allJournalist = await journalist.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      news: allJournalist,
    });
  } catch (error) {
    return next(error);
  }
};

const getJournalistByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const journalistByID = await journalist.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      journalist: journalistByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createJournalist = async (req, res, next) => {
  try {
    const newJournalist = new journalist(req.body);
    if (req.file) {
      newJournalist.picture = req.file.path;
    }
    const createdJournalist = newJournalist.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      createdJournalist: newJournalist,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteJournalist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const journalistDeleted = await Journalist.findByIdAndDelete(id)
    return res.status(200).json(journalistDeleted);
  } catch (error) {
    return next(error)
  }
}
const patchJournalist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchJournalist = new Journalist(req.body);
    patchJournalist._id = id;
    const JournalistDB = await Journalist.findByIdAndUpdate(
      id,
      patchJournalist
    );
    if (JournalistDB.picture) {
      deleteFile(JournalistDB.picture);
    }
    if (req.file) {
      JournalistDB.picture = req.file.path;
    }
    if (!JournalistDB) {
      return next(setError(404, 'Info not found'));
    }
    return res
      .status(200)
      .json({
        nuevoJournalist: patchJournalist,
        viejoJournalist: JournalistDB,
      });
  } catch (error) {}
};

module.exports = { getAllJournalist, getJournalistByID, createJournalist, patchJournalist, deleteJournalist };
