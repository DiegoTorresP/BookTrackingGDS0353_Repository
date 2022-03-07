var express = require("express");
var router = express.Router();

var user_controller = require("../controllers/alumnoController");
//Modulos Controladores Aqui

//Rutas de Administrador

router.get("/", function (req, res, next) {
  res.render("admin");
});

router.get("/libros", function (req, res, next) {
  res.render("libros");
});

router.get("/solicitudes", function (req, res, next) {
  res.render("solicitudes");
});

//Se llama al controlador para crear
router.post("/crear", user_controller.crear);

//Ruta para eliminar
router.get("/eliminar/:id", user_controller.eliminar);

router.get("/registrar-usuario", function (req, res, next){
  res.render("registrar_usuario");
});

router.get("/lista-usuario", user_controller.mostar);

router.get("/leer_qr", function (req, res, next) {
  res.render("leer_qr");
});

router.get("/admin_buscar", function (req, res, next) {
  res.render("admin_buscar");
});

router.get("/vista-libro", function (req, res, next){
  res.render("admin_vista_libro");
});

router.get("/registrar_libro", function (req, res, next) {
  res.render("registrar_libro");
});
router.get("/editar_libro", function (req, res, next) {
  res.render("editar_libro");
});

router.get("/menu-libro", function (req, res, next){
  res.render("libros");
});


module.exports = router;