const Alumno = require("../models/alumno");

var alumnoController = {};

//Mostar todos los alumnos 
alumnoController.mostar = (req, res) => {

    Alumno.find({}).sort({
        "Carrera_Tecnica": 1,
        "Nombre_s": 1
    }).exec((err, Alumno) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log("The INDEX");
        console.log(Alumno)
        return res.render('lista_usuarios', {
            Alumno: Alumno
        });

    });
};

//Insertar un Alumno
alumnoController.crear = (req, res) => {
    console.log('Registrando Usuario');
    const alumno = new Alumno({
        _id: req.body.numControl,
        Apellido_Paterno: req.body.apPaterno,
        Apellido_Materno: req.body.apMaterno,
        Nombre_s: req.body.nombre,
        Genero: req.body.sexo,
        CURP: req.body.curp,
        Carrera_Tecnica: req.body.especialidad,
        Turno: req.body.turno,
        Clave_lada: req.body.lada,
        Telefono_de_contacto_fijo_1: req.body.telefonoFijo1,
        Telefono_de_contacto_fijo_2: req.body.telefonoFijo2,
        Telefono_movil_celular: req.body.telefonoMovil,
        Correo_Electronico_1: req.body.correo1,
        Correo_Electronico_2: req.body.correo2,
        EstatusEscolar: "Activo",
        NumIncidencias: 0,
        qr: "",
        password: "",
        Grupo: req.body.grupo,
        Generacion: req.body.generacion,
    });
    alumno.save(function (err, alumno) {
        if (err) {
            return res.status(500).json({
                message: "Error al crear el Alumno"

            });
        }
        res.redirect('/administrar/lista-usuario');
    })
};

//Editar


//Eliminar
alumnoController.eliminar= (req, res)=>{
    const id= req.params.id;
    Alumno.findByIdAndRemove(id, (err, alumno)=>{
        if (err) {
            return res.status(500).json({message: "Error al eliminar"})
        }
    });
    res.redirect('/administrar/lista-usuario')
}


module.exports = alumnoController;