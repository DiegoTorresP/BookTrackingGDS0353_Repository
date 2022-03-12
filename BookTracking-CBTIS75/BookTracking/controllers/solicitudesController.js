const solicitud = require("../models/solicitud");
const alumno = require("../models/alumno");

var solicitudesController = {};

//Mostar todos los alumnos 
solicitudesController.mostar = (req, res) => {

    solicitud.find().exec((err, Solicitud) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log("The INDEX");
        Solicitud.forEach(function(element) {
            alumno.find({"_id":Solicitud._id},{"_id":0,"Nombre_s":1}).exec((err,Alumno) => {
                if (err) {
                    console.log('Error: ', err);
                    return;
                }
                console.log("Encontrado");
                console.log(Alumno)
                console.log(Solicitud)
                return res.render('solicitudes', {Solicitud: Solicitud, element });
            });
        });
        
    });
};


module.exports = solicitudesController;