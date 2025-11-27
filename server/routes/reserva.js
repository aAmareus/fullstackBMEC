import express from 'express';

import { test, crear_reserva, listar_reservas, mostrarReservas, listarUnaReserva, borrar_reserva } from "../controllers/reserveController.js";

const router = express.Router()

router.get('/reserva-prueba', test)
router.post('/reserva/crear', crear_reserva)
router.get('/reserva/mostrar', mostrarReservas)
router.get('/reserva/mostrar/:correo', listar_reservas)
router.get('/reserva/mustrar-una', listarUnaReserva)
router.delete('/reserva/eliminar/:id', borrar_reserva)
// router.put('/reserva/editar/:id', reserveController.edit_reserva)

export default router