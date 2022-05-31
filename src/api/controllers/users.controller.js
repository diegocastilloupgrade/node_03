const User = require("../models/user.model");
//Requerimos la depencia bcrypt para encriptar y desencriptar la contraseña
const bcrypt = require("bcrypt");
//Requirimos la dependencia jsonwebtoken para gestionar los tokens
const jwt = require("jsonwebtoken");

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

//Vamos a crear un usuario
const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const createdUser = newUser.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      user: null,
    });
  } catch (error) {
    return next(error);
  }
};

//Vamos a autenticar al usuario
const login = async (req, res, next) => {
  try {
    //Buscamos al usuario en la base de datos para ver que existe
    const userInfo = await User.findOne({ username: req.body.username });
    //Comparar la contraseña del Insomnia con la contraseña de la BD;
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      //Seteamos a null la contraseña del usuario para que no se refleje en ningún momento en este proceso, por temas de privacidad
      userInfo.password = null;
      //Creamos el token con el id y el username del usuario, le indicamos como se llama la clave secreta y el tiempo de caducidad del token
      const token = jwt.sign(
        {
          id: userInfo._id,
          username: userInfo.username,
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        user: userInfo,
        token: token,
      });
    } else {
      return res.json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login, register, logout };
