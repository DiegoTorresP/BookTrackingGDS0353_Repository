var express = require("express");
var router = express.Router();

//Modulos Controladores Aqui

//Rutas de Administrador

router.get("/", function (req, res, next) {
  res.render("admin");
});

router.get("/libros", function (req, res, next) {
  res.render("admin_buscar");
});

router.get("/solicitudes", function (req, res, next) {
  res.render("solicitudes");
});

router.get("/registrar-usuario", function (req, res, next) {
  res.render("registrar_user");
});

router.get("/vista-libro", function (req, res, next){
  res.render("admin_vista_libro");
});

router.get("/menu-libro", function (req, res, next){
  res.render("libros");
});


module.exports = router;