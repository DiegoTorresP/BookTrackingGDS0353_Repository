const solicitud = require("../models/solicitud");

var solicitudesController = {};

//Mostar todos los alumnos 
solicitudesController.mostar = (req, res) => {

    solicitud.find().exec((err, Solicitud) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log("The INDEX");
        console.log(Solicitud)
        return res.render('solicitudes', {Solicitud: Solicitud});

    });
};


module.exports = solicitudesController;