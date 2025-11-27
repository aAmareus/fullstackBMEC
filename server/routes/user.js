import express from 'express';

import { prueba, crear_usuario, listar_usuarios, listar_un_usuario, login, borrar_usuario, editar_usuario } from "../controllers/userController.js";

const router = express.Router()
// rutas de prueba para la gestión de artículos.
router.get('/prueba', prueba)


// Rutas de prueba para la gestión de la colección usuarios
router.post('/create-user', crear_usuario);
router.get('/users', listar_usuarios);
router.get('/listar-user/:id', listar_un_usuario);
router.post('/login', login)
router.delete('/users/delete/:id', borrar_usuario);
router.put('/edit-user/:id', editar_usuario);


export default router