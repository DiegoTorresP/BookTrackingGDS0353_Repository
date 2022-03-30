var express = require("express");
var router = express.Router();
//Modulos Controladores Aqui
var user_controller = require("../controllers/alumnoController");
var solicitudes_controller = require("../controllers/solicitudesController");
var libro_controller = require("../controllers/libroController");
const solicitudesController = require("../controllers/solicitudesController");
const auth = require('../middlewares/usuario');
//Rutas de Administrador

router.get("/",auth.isUser, function (req, res, next) {
  res.render("alumnos");
});

//listar todos los libros para el alumno
router.get("/buscar_solicitar_libro",auth.isUser, libro_controller.mostarAlumno);

//Ruta para mostar un solo libro
router.get("/alumnos_vista_libro/:id",auth.isUser, libro_controller.detalleAlumno);

//Ruta para crear solicitud
router.get("/solicitar_libro/:id/stock/:Unidades_Disponibles",auth.isUser, solicitudesController.crear_solicitud);

router.get("/historial_prestamos", auth.isUser,function (req, res, next) {
  res.render("alumnos_entregas_solicitudes_prestamos");
});
router.get("/ver_mi_qr",auth.isUser, function (req, res, next) {
  res.render("alumnos_ver_mi_qr");
});

//Ruta de actulización
<<<<<<< HEAD
router.get("/actualizar_unidades/:id",isUser,libro_controller.actualizarUnidadesAlumno );
=======
router.get("/actualizar_unidades/:id",auth.isUser,libro_controller.actualizarUnidades);

>>>>>>> 327b99e6438137d78be0ead47caff7e7a753a569


module.exports = router;