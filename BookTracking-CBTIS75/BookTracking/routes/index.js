var express = require('express');

var router = express.Router();
const controller = require('../controllers/alumnoController');
const auth = require('../middlewares/usuario');

/* GET home page. */
router.get('/',function(req,res){
  let data = {
    title: 'Ingresar al Sistema',
    layout: false //Indica que no se considere layout.pug
  }
  res.render('login',data);
  
});

/* router.get('/*',function(req,res){
  res.redirect('/');
})  */

//router.get('/home',controller.alumno_home);


router.get('/register', function(req, res, next){
  let data = {
      title: 'Registrar Usuario',
      layout:false
    }

  res.render('register', data);
});

router.get('/logout',auth.isLogin, controller.alumno_logout);

router.post("/verify", controller.alumno_verify);

//router.post('/addUser', controller.usuario_addUser);

module.exports = router;
