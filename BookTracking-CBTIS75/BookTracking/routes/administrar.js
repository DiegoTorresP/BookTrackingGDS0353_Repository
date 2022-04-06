var express = require("express");
var router = express.Router();
var user_controller = require("../controllers/alumnoController");
var solicitudes_controller = require("../controllers/solicitudesController");
var libro_controller = require("../controllers/libroController");
const auth = require('../middlewares/usuario');
const upload = require("../middlewares/foto");
//Modulos Controladores Aqui

//Rutas de Administrador

router.get("/",auth.isAdmin, function (req, res, next) {
  res.render("admin");
});

router.get("/libros",auth.isAdmin, function (req, res, next) {
  res.render("libros");
});

router.get("/solicitudes",auth.isAdmin,solicitudes_controller.mostar);

//Se llama al controlador para crear
router.post("/crear",auth.isAdmin,user_controller.crear);

//Ruta para crear un usuario
router.post("/crear_usuario",auth.isAdmin,user_controller.crear_usuario);

//Se llama al controlador para crear libro
router.post("/crear_libro",auth.isAdmin,libro_controller.crear);
//Ruta para subir la foto
router.post("/crear_foto", upload.single("foto"), libro_controller.imagen);

//Ruta para eliminar
router.get("/eliminar/:id",auth.isAdmin,user_controller.eliminar);

//Ruta de solicitud por alumno manual
router.post("/solicitar_libro/:id/stock/:Unidades_Disponibles",auth.isAdmin, solicitudes_controller.crear_solicitud_manual);

//Ruta de actulización
router.get("/actualizar_unidades/:id",auth.isAdmin,libro_controller.actualizarUnidades);

//Ruta para eliminar libro
router.get("/eliminar_libro/:id",auth.isAdmin, libro_controller.eliminar);


router.get("/registrar_usuario", auth.isAdmin,function (req, res, next){
  res.render("admin_registrar_usuario");
});

//Mostar todos los usuarios
router.get("/lista_usuario", auth.isAdmin,user_controller.mostar);

//Ruta para mostar y editar un solo usuarios
router.get("/usuario/:id",auth.isAdmin,user_controller.editar);
//Ruta para mostar y editar
router.post("/usuario/editar",auth.isAdmin, user_controller.editar1);

//Ruta para mostar un solo libro
router.get("/libro/:id",auth.isAdmin,libro_controller.detalle);

//Ruta para mostar y editar un libro
router.post("/libro/editar",auth.isAdmin,libro_controller.editar);

//Rutas para busquedas de libros
//Busqueda por nombre
router.post("/buscar_nombre_libro", auth.isAdmin,libro_controller.consultar_nombre);
//Busqueda por autor
router.post("/buscar_autor_libro", auth.isAdmin,libro_controller.consultar_autor);
//Busqueda por editorial
router.post("/buscar_editorial_libro", auth.isAdmin,libro_controller.consultar_editorial);

router.get("/leer_qr",auth.isAdmin,function (req, res, next) {
  res.render("admin_leer_qr");
});

router.get("/admin_devolver_libro",auth.isAdmin,function (req, res, next) {
  res.render("admin_devolver_libro");
});

router.get("/admin_entregar_libro",auth.isAdmin,function (req, res, next) {
  res.render("admin_entregar_libro");
});

router.get("/admin_buscar",auth.isAdmin,libro_controller.mostar);


router.get("/vista_libro", auth.isAdmin,function (req, res, next){
  res.render("admin_vista_libro");
});

router.get("/registrar_libro",auth.isAdmin, function (req, res, next) {
  res.render("admin_registrar_libro");
});

router.get("/menu_libro",auth.isAdmin,function (req, res, next){
  res.render("admin_libros");
});

//Ruta para  un alumno
router.get("/detalle_alumno/:Solicitante",auth.isAdmin,user_controller.consultar);

//Ruta para  un libro
router.get("/detalle_libro/:libro/solicitud/:id/status/:status",auth.isAdmin,user_controller.consultarLibro);


//Rutas de denegacion o aceptación de prestamo de libro
router.get("/denegar_prestamo/:id",auth.isAdmin,solicitudes_controller.actualizarEstatus_denegado);
router.get("/aceptar_prestamo/:id",auth.isAdmin,solicitudes_controller.actualizarEstatus);

//Ruta de actulización
router.get("/actualizar_denegacion/:id",auth.isAdmin,libro_controller.actualizarUnidades_denegadas);



//Rutas para busquedas de alumnos
//Busqueda por nombre
router.post("/busqueda_nombre", auth.isAdmin,user_controller.consultar_nombre); 
//Busqueda por carrera
router.post("/busqueda_carrera", auth.isAdmin,user_controller.consultar_carrera); 
//Busqueda por estatus escolar
router.post("/busqueda_estatus", auth.isAdmin,user_controller.consultar_estatus); 

//Rutas para busquedas de Solicitudes
//Busqueda por solicitante
router.post("/busqueda_solicitante", auth.isAdmin,solicitudes_controller.consultar_solicitante); 
//Busqueda por libro
router.post("/busqueda_libro",auth.isAdmin,solicitudes_controller.consultar_libro); 
//Busqueda por estatus
router.post("/busqueda_estatus_prestamo",auth.isAdmin, solicitudes_controller.consultar_estatus_solic); 
module.exports = router;