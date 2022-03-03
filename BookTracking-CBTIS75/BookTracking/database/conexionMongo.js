function connMongo() {
    var mongoose = require('mongoose');
    var mongoDB = "mongodb+srv://alumno:alumno@cluster0.nycer.mongodb.net/biblioteca?retryWrites=true&w=majority";
    mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error de Conexion a MongoDB'));
}

module.exports = connMongo