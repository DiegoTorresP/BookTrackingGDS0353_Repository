var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var libroSchema = new Schema({ 
    Nombre: String,
    Autor: [{type:Object}],
    Editorial: String,
    Lugar_Edicion: String,
    Fecha_Edicion: String,
    Año_Entrada: String,
    Unidades_Disponibles: Number,
    Total_Unidades: Number,
    Num_Pag: Number,
    Num_Inventario: Number,
    Anaquel_Charola: String,
    Clasificacion: String,
    Observaciones: String,
    Descripcion: String,
    Foto: String,
});



module.exports = mongoose.model('libros', libroSchema);