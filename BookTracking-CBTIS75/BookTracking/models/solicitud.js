var mongoose = require('mongoose');

var Schema = mongoose.Schema;
    ObjectId = Schema.ObjectId;
var solicitudSchema = new Schema({
    Solicitante: Number,
    Libro: ObjectId,
    Fecha_Solicitud:Date,
    Estatus_Prestamo: String,
    Fecha_Entrega:Date,
    Incidencias:Boolean
});



module.exports = mongoose.model('solicitudes', solicitudSchema);