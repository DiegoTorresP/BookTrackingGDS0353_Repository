var mongoose = require('mongoose');

var Schema = mongoose.Schema;
    ObjectId = Schema.ObjectId;
var solicitudSchema = new Schema({
    Solicitante: Number,
    Libro: ObjectId,
    Fecha_Solicitud:Date,
    Estatus_Prestamo: String,
    FechaEntrega:Date,
    Incidencias:Boolean
});



module.exports = mongoose.model('solicitudes', solicitudSchema);