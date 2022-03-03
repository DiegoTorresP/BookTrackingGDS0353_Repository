var mongoose = require('mongoose');
var user = require("../models/alumno");

var alumnoController = {};

alumnoController.list = function(req, res){
    
    user.find({}).exec(function(err, user){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render("lista_usuarios", {user:user} );
        
    });
};

alumnoController.show = function(req, res){
    user.findOne({_id: req.params.id}).exec(function(err, user){
        if( err ){ console.log('Error: ', err); return; }
        
        res.render("lista_usuarios", {user: user} );
    });  
};  


module.exports = alumnoController;