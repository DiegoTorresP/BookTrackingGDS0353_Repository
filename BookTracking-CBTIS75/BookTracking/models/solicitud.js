var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var solicitudSchema = new Schema({
    _id: Number,
    Solicitante: Number,
    Libro:String,
    FechaSolicitud:Date,
    NumeroRenovacion:Number,
    EstatusPrestamo: String
});


module.exports = mongoose.model('solicitudes', solicitudSchema);