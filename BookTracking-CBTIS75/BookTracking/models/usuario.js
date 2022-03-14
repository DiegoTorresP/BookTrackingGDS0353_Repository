var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  //Define los atributos username, password e email
  username: {
    type: String,
    trim: true,
    lowercase: true,
    required: "El usuario es requerido",
    minlength: 8,
    maxlength: 20,
  },
  password: {
    type: String,
    trim: true,
    lowercase: true,
    required: "Contraseña es requerido",
    minlength: 8,
    maxlength: 15,
  },
  email: {
    type: String,
    trim: true,
    required: "El email es requerido",
  },
});

module.exports = mongoose.model("users", UserSchema);
