const mongoose = require("mongoose");
//Requerimos bcrypt para poder encriptar la contraseña justo antes de guardar el usuario.
const bcrypt = require("bcrypt");
//Definimos el numero de vueltas que va a dar bcrypt antes de devolver la contraseña encriptada
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
});

//Antes de almacenar el usuario encriptaremos la contraseña para que entre ya encriptada a la base de datos
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model("users", UserSchema);
module.exports = User