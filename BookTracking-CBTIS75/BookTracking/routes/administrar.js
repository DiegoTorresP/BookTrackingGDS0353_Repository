var express = require("express");
var router = express.Router();
var user_controller = require("../controllers/alumnoController");
var solicitudes_controller = require("../controllers/solicitudesController");
var libro_controller = require("../controllers/libroController");
const isAdmin = require('../middlewares/usuario');
//Modulos Controladores Aqui

//Rutas de Administrado
router.get("/", function (req, res, next) {
  res.render("login");
});

router.get("/libros", function (req, res, next) {
  res.render("libros");
});

router.get("/solicitudes",solicitudes_controller.mostar);

//Se llama al controlador para crear
router.post("/crear",user_controller.crear);

//Se llama al controlador para crear libro
router.post("/crear_libro",libro_controller.crear);

//Ruta para eliminar
router.get("/eliminar/:id", user_controller.eliminar);

//Ruta de solicitud por alumno manual
router.post("/solicitar_libro/:id/stock/:Unidades_Disponibles", solicitudes_controller.crear_solicitud_manual);

//Ruta de actulización
router.get("/actualizar_unidades/:id",libro_controller.actualizarUnidades);

//Ruta para eliminar libro
router.get("/eliminar_libro/:id", libro_controller.eliminar);


router.get("/registrar-usuario", function (req, res, next){
  res.render("admin_registrar_usuario");
});

//Mostar todos los usuarios
router.get("/lista-usuario", user_controller.mostar);

//Ruta para mostar y editar un solo usuarios
router.get("/usuario/:id",user_controller.editar);
//Ruta para mostar y editar
router.post("/usuario/editar", user_controller.editar1);

//Ruta para mostar un solo libro
router.get("/libro/:id",libro_controller.detalle);

//Ruta para mostar y editar un libro
router.post("/libro/editar",libro_controller.editar);

//Rutas para busquedas de libros
//Busqueda por nombre
router.post("/buscar_nombre_libro", isAdmin,libro_controller.consultar_nombre);
//Busqueda por autor
router.post("/buscar_autor_libro", isAdmin,libro_controller.consultar_autor);
//Busqueda por editorial
router.post("/buscar_editorial_libro", isAdmin,libro_controller.consultar_editorial);

router.get("/leer_qr",function (req, res, next) {
  res.render("admin_leer_qr");
});

router.get("/admin_buscar",libro_controller.mostar);


router.get("/vista-libro", function (req, res, next){
  res.render("admin_vista_libro");
});

router.get("/registrar_libro", function (req, res, next) {
  res.render("admin_registrar_libro");
});

router.get("/menu-libro",function (req, res, next){
  res.render("admin_libros");
});

//Ruta para  un alumno
router.get("/detalle_alumno/:Solicitante",user_controller.consultar);

//Ruta para  un libro
router.get("/detalle_libro/:libro/solicitud/:id/status/:status",user_controller.consultarLibro);


//Rutas de denegacion o aceptación de prestamo de libro
router.get("/denegar_prestamo/:id",solicitudes_controller.actualizarEstatus_denegado);
router.get("/aceptar_prestamo/:id",solicitudes_controller.actualizarEstatus);

//Ruta de actulización
router.get("/actualizar_denegacion/:id",libro_controller.actualizarUnidades_denegadas);



//Rutas para busquedas de alumnos
//Busqueda por nombre
router.post("/busqueda_nombre", user_controller.consultar_nombre); 
//Busqueda por carrera
router.post("/busqueda_carrera", user_controller.consultar_carrera); 
//Busqueda por estatus escolar
router.post("/busqueda_estatus", user_controller.consultar_estatus); 

//Rutas para busquedas de Solicitudes
//Busqueda por solicitante
router.post("/busqueda_solicitante", isAdmin,solicitudes_controller.consultar_solicitante); 
//Busqueda por libro
router.post("/busqueda_libro",isAdmin,solicitudes_controller.consultar_libro); 
//Busqueda por estatus
router.post("/busqueda_estatus_prestamo",isAdmin, solicitudes_controller.consultar_estatus_solic); 
module.exports = router;