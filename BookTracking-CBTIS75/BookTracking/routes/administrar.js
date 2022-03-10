var express = require("express");
var router = express.Router();

var user_controller = require("../controllers/alumnoController");
var solicitudes_controller = require("../controllers/solicitudesController");
//Modulos Controladores Aqui

//Rutas de Administrador

router.get("/", function (req, res, next) {
  res.render("admin");
});

router.get("/libros", function (req, res, next) {
  res.render("libros");
});

router.get("/solicitudes",solicitudes_controller.mostar);

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

router.get("/editar_libro", function(req, res, next){
  res.render("editar_libro");
});

//Ruta para buscar un alumno
router.get("/detalle_alumno/:Solicitante",user_controller.consultar);


router.get("/detalle_libro", function(req, res, next){
  res.render("detalle_atender_libro");
});

//Rutas de denegacion o aceptación de prestamo de libro
router.get("/aceptar_prestamo/:Solicitante",solicitudes_controller.mostar);
router.get("/denegar_prestamo/:Solicitante",solicitudes_controller.mostar);

module.exports = router;