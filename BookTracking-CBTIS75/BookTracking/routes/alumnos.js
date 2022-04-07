var express = require("express");
var router = express.Router();
//Modulos Controladores Aqui
var user_controller = require("../controllers/alumnoController");
var solicitudes_controller = require("../controllers/solicitudesController");
var libro_controller = require("../controllers/libroController");
const solicitudesController = require("../controllers/solicitudesController");
const auth = require('../middlewares/usuario');
const alumnoController = require("../controllers/alumnoController");
//Rutas de Administrador

router.get("/",auth.isUser, function (req, res, next) {
  res.render("alumnos");
});

//listar todos los libros para el alumno
router.get("/buscar_solicitar_libro",auth.isUser, libro_controller.mostarLibro);

//Ruta para mostar un solo libro
router.get("/alumnos_vista_libro_historial/:id",auth.isUser, libro_controller.detalleHistorialLibro);

router.get("/alumnos_vista_libro/:id",auth.isUser, libro_controller.detalleLibro);


//Ruta para crear solicitud
router.get("/solicitar_libro/:id/stock/:Unidades_Disponibles",auth.isUser, solicitudesController.crear_solicitud);

router.get("/historial_prestamos", auth.isUser,solicitudesController.mostarHistorial);

//Ruta para ver el qr
router.get("/ver_mi_qr",auth.isUser, alumnoController.mostar_qr);

//Ruta de actulización
router.get("/actualizar_unidades/:id",auth.isUser,libro_controller.actualizarUnidades);

router.get("/generar_qr", auth.isUser, alumnoController.generar_qr);



module.exports = router;