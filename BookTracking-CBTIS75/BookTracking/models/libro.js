var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var libroSchema = new Schema({ 
    Nombre: {type:String},
    Autor: [{type:Object}],
    Editorial: {type:String},
    Lugar_Edicion: {type:String},
    Fecha_Edicion: {type:Number},
    Año_Entrada: {type:Number},
    Unidades_Disponibles: {type:Number},
    Total_Unidades: {type:Number},
    Num_Pag: {type:Number},
    Num_Inventario: {type:Number},
    Anaquel_Charola: {type:String},
    Clasificacion: {type:String},
    Observaciones: {type:String},
    Descripcion: {type:String},
    Foto: {type:String},
});



module.exports = mongoose.model('libros', libroSchema);