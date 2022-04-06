var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var alumnoSchema = new Schema({
  _id: {type:Number},
  Apellido_Paterno: {type:String},
  Apellido_Materno: {type:String},
  Nombre_s: {type:String},
  Genero: {type:String},
  CURP: {type:String},
  Carrera_Tecnica: {type:String},
  Turno: {type:String},
  Clave_Lada: {type:Number},
  Telefono_de_contacto_fijo_1: {type:Number},
  Telefono_de_contacto_fijo_2: {type:Number},
  Telefono_movil_celular: {type:Number},
  Correo_Electronico_1: {type:String},
  Correo_Electronico_2: {type:String},
  Estatus_Escolar: {type:String},
  Num_Incidencias: {type:Number},
  Qr: {type:String},
  Password: {
    type: String,
    trim: true,
    requerid: "¡Ingresa la contraseña por favor!",
  },
  Grupo: {type:String},
  Generacion: {type:String},
  Username: {
    type: String,
    trim: true,
    lowercase: true,
    requerid: "¡Ingresa el nombre de usuario por favor!",
  },
  Roles: {
    type: String,
  },
});

module.exports = mongoose.model("usuarios", alumnoSchema);
