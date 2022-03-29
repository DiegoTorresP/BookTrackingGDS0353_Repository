const Usuario = require("../models/alumno");


module.exports = isAdmin = (req, res, next)=>{
  console.log(req.session.usuario);
  if(req.session.usuario) {
    next();
  }else{
    res.render('login');
  }
};

module.exports=isUser = (req, res, next)=>{
  if(req.session.usuario&&req.session.role=="user") {
    next();
  }else{
    res.render('login');
  }
}; 

