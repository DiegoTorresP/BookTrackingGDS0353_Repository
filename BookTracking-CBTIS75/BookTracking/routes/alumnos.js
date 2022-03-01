var express = require("express");
var router = express.Router();

//Modulos Controladores Aqui

//Rutas de Administrador

router.get("/", function (req, res, next) {
  res.render("alumno");
});

router.get("/buscar_solicitar_libro", function (req, res, next) {
  res.render("buscar_solicitar_libro");
});
router.get("/historial_prestamos", function (req, res, next) {
  res.render("entregas_solicitudes_prestamos");
});
router.get("/ver_mi_qr", function (req, res, next) {
  res.render("ver_mi_qr");
});

module.exports = router;