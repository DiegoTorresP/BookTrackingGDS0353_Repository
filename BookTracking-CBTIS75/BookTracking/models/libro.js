var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var libroSchema = new Schema({ 
    Nombre: String,
    Autor: [{type:Object}],
    Editorial: String,
    LugarEdicion: String,
    FechaEdicion: String,
    AñoEntrada: String,
    UnidadesDisponibles: Number,
    TotalUnidades: Number,
    NumPag: Number,
    NumInventario: Number,
    AnaquelCharola: String,
    Clasificacion: String,
    Observaciones: String,
    Descripcion: String,
    Foto: String,
});



module.exports = mongoose.model('libros', libroSchema);