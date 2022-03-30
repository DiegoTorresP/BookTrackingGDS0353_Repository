const middleware ={};

middleware.isUser = (req, res, next)=>{
  console.log(req.session.usuario);
  if(req.session.usuario&&req.session.role=='user') {
    next();
  }else{
    res.redirect('/');
  }
}; 

middleware.isAdmin = (req, res, next)=>{
  console.log(req.session.role);
  if(req.session.usuario&&req.session.role=='admin') {
    next();
  }else{
    res.redirect('/');
  }
};


module.exports = middleware;