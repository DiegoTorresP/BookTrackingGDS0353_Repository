const middleware ={};

<<<<<<< HEAD
module.exports = isAdmin = (req, res, next)=>{
=======
middleware.isUser = (req, res, next)=>{
>>>>>>> 327b99e6438137d78be0ead47caff7e7a753a569
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