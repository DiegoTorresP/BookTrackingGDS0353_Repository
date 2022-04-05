var mongoose = require('mongoose');

var Schema = mongoose.Schema;
    ObjectId = Schema.ObjectId;
var solicitudSchema = new Schema({
    Solicitante: {type:Number},
    Libro: ObjectId,
    Fecha_Solicitud:{type:Date},
    Estatus_Prestamo: {type:String},
    Fecha_Entrega:{type:Date},
    Incidencias:{type:Boolean}
});



module.exports = mongoose.model('solicitudes', solicitudSchema);