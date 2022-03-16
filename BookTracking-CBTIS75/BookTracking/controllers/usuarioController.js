var User = require('../models/usuario');
const { body,validationResult} = require('express-validator');

exports.usuario_login = function(req,res){
    res.send("Ruta login controlada");
}

exports.usuario_home = function(req,res){
    res.send("Ruta home controlada");
}

exports.usuario_logout = function(req,res){
    res.send("Ruta logout controlada");
}

exports.usuario_register = function(req,res){
    res.send("Ruta register controlada");
}

exports.usuario_verify = function (req,res){
    let usuario = req.body.username;
    let pass = req.body.password;

    console.log('Usuario: '+ usuario + 'Pass: ' + pass);

    if (usuario && pass) {
        User.find({'username': usuario, 'password':pass}, function(error, results){
            if (error) {
                let data = {
                    title: 'Ingresar al Sistema',
                    message: 'Hubo un error contacte a soporte',
                    layout:false
                }
                res.render('login', data);                
            }

            if (results.length > 0) {
                req.session.usuario = usuario;
                res.render('admin');
            } else {
                let data = {
                    title: 'Ingresar al Sistema',
                    message: 'Usuario o contraseña incorrecto',
                    layout:false
                }
                res.render('login', data);   
            }
        });

    } else {
        let data = {
            title: 'Ingresar al Sistema',
            message: 'Usuario o Contraseña vacío',
            layout:false
        }
        res.render('admin', data);
    }
};


exports.usuario_addUser = [
    body('username','Usuario es requerido').trim().isLength({min:8, max:15}).escape(),
    body('email','Email es requerido').trim().isEmail().escape(), 
    body('password','Contraseña es requerida').trim().isLength({min:8, max:15}).escape(),
 
    (req, res, next) => {
        console.log('Ingresando a la validación');
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            let data = {
                title: 'Registro de Usuario',
                messages: errors.array()
            };
            res.render('register', data);
            return;
        } else {
            console.log('Registrando Usuario');
            let user = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });

            user.save(function(error){
                if (error) { return next(error); }

                let data= {title: 'Ingresar Sistema', message:'Bienvenido ' + req.body.username}
                res.render('index', data);
            });
        }
    }
];


exports.usuario_logout = function(req, res) {
    req.session.destroy();

    let data = {
        title: 'Ingresar al Sistema',
        layout:false
    }
    res.render('login', data);   

};