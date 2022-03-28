var express = require("express");
var router = express.Router();

//Modulos Controladores Aqui
var user_controller = require("../controllers/alumnoController");
var solicitudes_controller = require("../controllers/solicitudesController");
var libro_controller = require("../controllers/libroController");
const solicitudesController = require("../controllers/solicitudesController");
//Rutas de Administrador

router.get("/", function (req, res, next) {
  res.render("alumnos");
});

//listar todos los libros para el alumno
router.get("/buscar_solicitar_libro", libro_controller.mostarAlumno);

//Ruta para mostar un solo libro
router.get("/alumnos_vista_libro/:id", libro_controller.detalleAlumno);

//Ruta para crear solicitud
router.get("/solicitar_libro/:id/stock/:Unidades_Disponibles", solicitudesController.crear_solicitud);

router.get("/historial_prestamos", function (req, res, next) {
  res.render("alumnos_entregas_solicitudes_prestamos");
});
router.get("/ver_mi_qr", function (req, res, next) {
  res.render("alumnos_ver_mi_qr");
});

//Ruta de actulización
router.get("/actualizar_unidades/:id",libro_controller.actualizarUnidades);



module.exports = router;