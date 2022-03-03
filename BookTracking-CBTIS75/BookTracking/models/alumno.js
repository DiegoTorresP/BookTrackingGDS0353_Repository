var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    Apellido_Paterno:{type: String},
    Apellido_Materno:{type: String},
    Nombre_s:{type: String},
    Genero:{type: String},
    Curp:{type: String},
    Carrera_Tecnica:{type: String},
    Turno:{type: String},
    Clave_lada:{type:Number},
    Telefono_de_contacto_fijo_1:{type:Number},
    Telefono_de_contacto_fijo_2:{type:Number},
    Telefono_movil_celular:{type:Number},
    Correo_Electronico_1:{type:String},
    Correo_Electronico_2:{type:String},
    EstatusEscolar:{type:String},
    NumIncidencias: {type:Number},
    qr:{type:Number},
    password:{type:String}
});


module.exports = mongoose.model('Alumno', UserSchema);