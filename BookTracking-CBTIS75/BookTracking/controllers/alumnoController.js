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
//Mostar el alumno a editar
alumnoController.editar= (req, res)=>{
    const id= req.params.id;
    Alumno.find({"_id":id}).exec((err, Alumno) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log("The INDEX");
        console.log(Alumno)
        return res.render('vista_usuario', {
            Alumno: Alumno
        });
    });
}

//Editar el alumno mostrado
alumnoController.editar1=(req, res)=>{
        const _id= req.body.numControl;
        const Apellido_Paterno= req.body.apPaterno;
        const Apellido_Materno= req.body.apMaterno;
        const Nombre_s= req.body.nombre;
        const Genero= req.body.sexo;
        const CURP= req.body.curp;
        const Carrera_Tecnica= req.body.especialidad;
        const Turno= req.body.turno;
        const Clave_lada= req.body.lada;
        const Telefono_de_contacto_fijo_1= req.body.telefonoFijo1;
        const Telefono_de_contacto_fijo_2= req.body.telefonoFijo2;
        const Telefono_movil_celular= req.body.telefonoMovil;
        const Correo_Electronico_1= req.body.correo1;
        const Correo_Electronico_2= req.body.correo2;
        const Grupo= req.body.grupo;
        const Generacion= req.body.generacion;

        Alumno.updateOne({"_id":_id},{$set:{
            "_id":_id,
            "Apellido_Paterno":Apellido_Paterno,
            "Apellido_Materno":Apellido_Materno,
            "Nombre_s":Nombre_s,
            "Genero":Genero,
            "CURP":CURP,
            "Carrera_Tecnica":Carrera_Tecnica,
            "Turno":Turno,
            "Clave_lada":Clave_lada,
            "Telefono_de_contacto_fijo_1":Telefono_de_contacto_fijo_1,
            "Telefono_de_contacto_fijo_2":Telefono_de_contacto_fijo_2,
            "Telefono_movil_celular":Telefono_movil_celular,
            "Correo_Electronico_1":Correo_Electronico_1,
            "Correo_Electronico_2":Correo_Electronico_2,
            "Grupo":Grupo,
            "Generacion":Generacion
        }}).exec((err, Alumno) => {
            if (err) {
                console.log('Error al actalizar el alumno:', err);
                return;
            }
            console.log("The INDEX");
            console.log(Alumno)
            res.redirect('/administrar/lista-usuario');
        });
}

//Eliminar
alumnoController.eliminar= (req, res)=>{
    const id= req.params.id;
    console.log(id)
    Alumno.findByIdAndRemove(id, (err, alumno)=>{
        if (err) {
            return res.status(500).json({message: "Error al eliminar"})
        }
    });
    res.redirect('/administrar/lista-usuario')
}



//Consultar
alumnoController.consultar= (req, res)=>{
    const solicitante= req.params.Solicitante;
    console.log(solicitante);
    Alumno.find({"_id":solicitante}).exec((err,Alumno) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log(solicitante+" Encontrado");
        console.log(Alumno)
        return res.render('detalle_atender_alumno', {
            Alumno: Alumno
        });

    });
}

module.exports = alumnoController;