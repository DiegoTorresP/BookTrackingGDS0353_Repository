const Alumno = require("../models/alumno");
const Libro = require("../models/libro");
const { body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const qr = require('qrcode');
var alumnoController = {};

alumnoController.alumno_login = function(req,res){
    res.send("Ruta login controlada");
}


alumnoController.alumno_logout = function(req,res){
    res.send("Ruta logout controlada");
   
}


alumnoController.alumno_verify = function (req,res){
    let usuario = req.body.username;
    let pass = req.body.password;
    
    console.log('Usuario: '+ usuario + 'Pass: ' + pass);

    if (usuario && pass) {
        Alumno.find({'Username': usuario}, function(error, results){
            console.log(results);

             let passw;
            results.forEach(e => {
                passw= e.Password;
            });
            console.log(passw);
            passw=passw.toString();
            bcrypt.compare(pass, passw, (err, coinciden) => {
                if (err) {
                    console.log("Error comprobando:", err);
                } else {
                    console.log("¿La contraseña coincide?: " + coinciden); 
                    if (error) {
                        let data = {
                            title: 'Ingresar al Sistema',
                            message: 'Hubo un error contacte a soporte',
                            layout:false
                        }
                        res.render('login', data);                
                    }
                    //
                    if (results.length > 0 && coinciden==true) {
                        let roles
                        results.forEach(element => {
                            roles= element.Roles;
                        }); 
                        req.session.usuario = usuario;
                        req.session.role = roles;
                        req.session.nombre = 
                         console.log(req.session.usuario+' verifica');
                         console.log(req.session.role+' verifica');
                        if(roles=='admin'){
                            res.render('admin');
                        }else if(roles=='user'){
                            res.render('alumnos');//next();
                        }
                        
                        
        
                    } else {
                        let data = {
                            title: 'Ingresar al Sistema',
                            message: 'Usuario o Contraseña incorrecto',
                            layout:false
                        }
                        res.render('login', data);   
                    }
                }
            }
            
            );
        });

    } else {
        let data = {
            title: 'Ingresar al Sistema',
            message: 'Usuario o Contraseña vacío',
            layout:false
        }
        res.render('login', data);
    }


};


alumnoController.alumno_logout = function(req, res) {
    let data = {
        title: 'Ingresar al Sistema',
        layout:false
    }
    req.session.destroy((err) => {
        res.redirect('/') // will always fire after session is destroyed
      })
};


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
        return res.render('admin_lista_usuarios', {
            Alumno: Alumno
        });

    });
};

//Insertar un Alumno
alumnoController.crear = (req, res) => {
    console.log('Registrando Usuario');
    const passw = '$' + req.body.numControl + 'cbtis75';
    const rondasDeSal = 10;
    let qrcode = 0;
    bcrypt.hash(passw, rondasDeSal, (err, password) => {
        if (err) {
            console.log("Error hasheando:", err);
        } else {


            Alumno.find({}).sort({ 'Qr': -1 }).limit(1).exec((err, results) => {
                if (err) {
                    console.log("Error: ", err);
                    return;
                }
                qrcode = parseInt(results[0].Qr) + 1;
                console.log('Generate QRCode' + qrcode);

                let data = {
                    qr: qrcode
                }

                let strData = JSON.stringify(data);
                console.log(strData);
                qr.toDataURL(strData, (err, code) => {
                    if (err) res.send("Error occured");
//Code es la imagen
                    let data = {
                        qr: qrcode,
                        code: code
                    }
                    console.log(data.qr)

                    //
                    console.log("Y hasheada es: " + password);
                    const alumno = new Alumno({
                        _id: req.body.numControl,
                        Apellido_Paterno: req.body.apPaterno,
                        Apellido_Materno: req.body.apMaterno,
                        Nombre_s: req.body.nombre,
                        Genero: req.body.sexo,
                        CURP: req.body.curp,
                        Carrera_Tecnica: req.body.especialidad,
                        Turno: req.body.turno,
                        Clave_Lada: req.body.lada,
                        Telefono_de_contacto_fijo_1: req.body.telefonoFijo1,
                        Telefono_de_contacto_fijo_2: req.body.telefonoFijo2,
                        Telefono_movil_celular: req.body.telefonoMovil,
                        Correo_Electronico_1: req.body.correo1,
                        Correo_Electronico_2: req.body.correo2,
                        Estatus_Escolar: "Activo",
                        Num_Incidencias: 0,
                        Qr: qrcode,
                        Password: password,
                        Grupo: req.body.grupo,
                        Generacion: req.body.generacion,
                        Username: req.body.numControl,
                        Roles: "user",
                    });
                    alumno.save(function (err, alumno) {
                        if (err) {
                            return res.status(500).json({
                                message: "Error al crear el Alumno"

                            });
                        }
                        res.redirect('/administrar/lista_usuario');
                        //res.render('qr', data);
                    })
                });
            });
        }
    });
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
        return res.render('admin_vista_usuario', {
            Alumno: Alumno
        });
    });
}

alumnoController.crear_usuario = (req, res) => {
    console.log('Registrando Usuario');
    const passw = req.body.password;
    const rondasDeSal = 10;
    var id = Math.floor(Math.random()*1257)+5;
    bcrypt.hash(passw, rondasDeSal, (err, password) => {
        if (err) {
            console.log("Error hasheando:", err);
        } else {
            console.log("Y hasheada es: " + password);
            const alumno = new Alumno({
                _id: id,
                Apellido_Paterno: req.body.apPaterno,
                Apellido_Materno: req.body.apMaterno,
                Nombre_s: req.body.nombre,
                Genero: null,
                CURP: null,
                Carrera_Tecnica: null,
                Turno: null,
                Clave_Lada: null,
                Telefono_de_contacto_fijo_1: null,
                Telefono_de_contacto_fijo_2: null,
                Telefono_movil_celular: null,
                Correo_Electronico_1: null,
                Correo_Electronico_2: null,
                Estatus_Escolar: null,
                Num_Incidencias: null,
                Qr: null,
                Password: password,
                Grupo: null,
                Generacion: null,
                Username: req.body._id,
                Roles: req.body.role,
            });
            alumno.save(function (err, alumno) {
                if (err) {
                    return res.status(500).json({
                        message: "Error al crear el Alumno"
        
                    });
                }
                res.redirect('/administrar/lista_usuario');
            })
        }
    }); 
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
        return res.render('admin_vista_usuario', {
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
        const Clave_Lada= req.body.lada;
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
            "Clave_lada":Clave_Lada,
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
    res.redirect('/administrar/lista_usuario')
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
        return res.render('admin_detalle_atender_alumno', {
            Alumno: Alumno
        });

    });
}

//Consultar por libro
alumnoController.consultarLibro = (req, res) =>{
    const libro= req.params.libro;
    const id_sol=req.params.id;
    const status=req.params.status;
    console.log(libro);
    console.log(id_sol);
    Libro.find({"_id":libro}).exec((err,Libro) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log(libro+" Encontrado");
        console.log(Libro)
        return res.render('admin_detalle_atender_libro', {
            Libro: Libro , id_sol, status
        });

    });
}

//Consulta por nombre.
alumnoController.consultar_nombre= (req, res)=>{
    const busqueda= req.body.nombre;
    console.log(busqueda);

    Alumno.find({Nombre_s: {$regex: busqueda, $options : 'i'}},{}).exec((err,Alumno) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log(busqueda+" Encontrado");
        console.log(Alumno)
        return res.render('admin_lista_usuarios', {
            Alumno: Alumno
        });

    });
}

//Consulta por carrera
alumnoController.consultar_carrera= (req, res)=>{
    const busqueda= req.body.carrera;
    console.log(busqueda);

    Alumno.find({Carrera_Tecnica: {$regex: busqueda, $options : 'i'}},{}).exec((err,Alumno) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log(busqueda+" Encontrado");
        console.log(Alumno)
        return res.render('admin_lista_usuarios', {
            Alumno: Alumno
        });

    });
}
//Consulta por estatus
alumnoController.consultar_estatus= (req, res)=>{
    const busqueda= req.body.estatus;
    console.log(busqueda);

    Alumno.find({Estatus_Escolar: {$regex: busqueda, $options : 'i'}},{}).exec((err,Alumno) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log(busqueda+" Encontrado");
        console.log(Alumno)
        return res.render('admin_lista_usuarios', {
            Alumno: Alumno
        });

    });
}

//Mostar qr de alumno
alumnoController.mostar_qr= (req, res)=>{
    let qrcode = 0;
    const usuario = req.session.usuario;

    Alumno.find({_id:usuario}).exec((err, results) => {
        if (err) {
            console.log("Error: ", err);
            return;
        }

        results.forEach(element => {
            qrcode= element.Qr;
        });

        

        if(qrcode==null || qrcode==""){
            let data = {
                qr: qrcode=null,
                code: code=null
            }
            res.render("alumnos_ver_mi_qr", data)
        }else{
            console.log(qrcode);
        qr.toDataURL(qrcode, (err, code) => {
            if (err) res.send("Error occured");

            let data = {
                qr: qrcode,
                code: code
            }
            res.render('alumnos_ver_mi_qr', data);
        }); 
        }
    });
}

alumnoController.generar_qr=(req, res)=>{
    let qrcode = 0;
    const usuario = req.session.usuario;

    Alumno.find({}).sort({ 'Qr': -1 }).limit(1).exec((err, results) => {
        if (err) {
            console.log("Error: ", err);
            return;
        }
        qrcode = parseInt(results[0].Qr) + 1;
        console.log('Generate QRCode' + qrcode);
        
        Alumno.updateOne({"_id":usuario},{$set:{
            "Qr":qrcode
        }}).exec((err, Alumno) => {
            if (err) {
                console.log('Error al generar QR:', err);
                return;
            }
            res.redirect('/alumnos/ver_mi_qr');
        });

    });

}

module.exports = alumnoController;