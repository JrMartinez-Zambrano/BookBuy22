const express = require("express");
const routes = express.Router();

const clientesController = require("../controllers/clientesControllers.js");
const librosController = require("../controllers/librosController.js");
const usuariosController = require("../controllers/usuariosControllers");
const tweetsController = require("../controllers/tweetsControllers");
const authController = require("../controllers/authController");
const comentariosController = require("../controllers/comentariosController");
const checkOutController = require("../controllers/checkoutController");
const ventasController = require("../controllers/ventasController");

module.exports = function () {

    routes.get("/", authController.usuarioAutenticado, librosController.administradorVerificacion, librosController.librosHome);

    // Rutas para la creación de clientes
    routes.post("/crear_cliente", authController.usuarioAutenticado, clientesController.nuevoCliente);
    routes.get("/crear_cliente", authController.usuarioAutenticado, clientesController.formularioNuevoCliente);

    // Rutas para el ingreso de libros
    routes.post("/crear_libro", authController.usuarioAutenticado, librosController.nuevoLibro);
    routes.get("/crear_libro", authController.usuarioAutenticado, librosController.formularioNuevoLibro);

    //  Ruta para mostar los libros existentes
    routes.get("/home_cliente", authController.usuarioAutenticado, clientesController.clientesHome);
    routes.get("/home_libro", authController.usuarioAutenticado, librosController.librosHome);

    // Rutas para la compra de libros
    routes.delete("/libro/:url", authController.usuarioAutenticado, librosController.comprarLibro);

    // Rutas para el ingreso de un nuevo usario
    routes.get("/registrate", usuariosController.formularioCrearCuenta);
    routes.post("/registrate", usuariosController.crearCuenta);

    routes.get("/iniciar_sesion", usuariosController.formularioIniciarSesion);
    routes.post("/iniciar_sesion", authController.autenticarUsuario);

    // Rutas para los tweets
    routes.get("/home_tweets", tweetsController.tweetsHome);
    routes.post("/crear_tweet", tweetsController.nuevoTweet);

    // Rutas para ingreso a las estaterias personalizadas
    routes.get("/mi_estanteria", authController.usuarioAutenticado, librosController.miEstanteria);

    // Ruta para editar libro
    routes.get("/libro/:url", authController.usuarioAutenticado, librosController.obtenerLibroPorUrl);
    routes.post("/actualizar_libro/:id", authController.usuarioAutenticado, librosController.actualizarLibro);

    // Ruta para crear y ver los comentarios
    routes.get("/home_comentarios", authController.usuarioAutenticado, comentariosController.comentariosHome);
    routes.post("/crear_comentarios", authController.usuarioAutenticado, comentariosController.nuevoComentario);

    // Ruta para actualizar la información de usuario
    routes.get("/ver_usuario", authController.usuarioAutenticado, usuariosController.formularioVerUsuario);
    routes.post("/actualizar_usuario", authController.usuarioAutenticado, usuariosController.actualizarUsuario);

    // Ruta para realizar el uso de Stripe para mediar los pagos
    routes.post("/checkout", authController.usuarioAutenticado, checkOutController.checkOut);

    // Ruta para ver las ventas por cada usuario
    routes.get("/mis_ventas", authController.usuarioAutenticado, ventasController.misVentas);

    // Ruta para el cierre de sesión
    routes.get("/cerrar_sesion", authController.cerrarSesion);

    // Ruta para ver las ventas globales desde el administrador
    routes.get("/ventas_globales", authController.usuarioAutenticado, ventasController.ventasGlobales);

    // Ruta para ver los usarios desde el administrador
    routes.get("/control_usuarios", authController.usuarioAutenticado, usuariosController.controlUsuarios);

    // Ruta para ver los libros en venta desde el administrador
    routes.get("/estanteria_global", authController.usuarioAutenticado, librosController.estanteriaGlobal);

    return routes;
};