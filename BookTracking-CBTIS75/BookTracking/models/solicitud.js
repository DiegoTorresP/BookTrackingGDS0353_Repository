var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var solicitudSchema = new Schema({
    _id: Number,
    Solicitante: Number,
    Libro:String,
    FechaSolicitud:Date,
    EstatusPrestamo: String,
    FechaEntrega:Date,
    Incidencias:Boolean
});



module.exports = mongoose.model('solicitudes', solicitudSchema);