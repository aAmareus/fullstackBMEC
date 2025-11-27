import fs from 'fs';
import path from 'path';

import { checkReserva } from "../util/validator.js"

import Reserve from '../models/reserva_model.js'

export const test = (req, res) => {
    return res.status(200).json({
        mensaje: "Rutas de reserva funcionando"
    })
}

// Función para crear reserva
export const crear_reserva = (req, res) => {
    let params = req.body;

    try {
        checkReserva(params);
    } catch(error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por completar."
        })
    }

    const reserva = new Reserve(params);

    reserva.save().then((reseraSaved) => {
        return res.status(200).json({
            status: "éxito",
            mensaje: " Reserva guardada con éxito",
            reserva: reseraSaved
        })
    })
}

export const listar_reservas = async (req, res) => {
    try {
        const correo = req.params.correo;

        let consult = Reserve.find({userEmail: correo})

        if (req.params.ultimos) {
            consult.limit(parseInt(req.params.ultimos))
        }

        let result = await consult.sort({ fechaInicio: -1 })
        console.log(result)
        if (!result || result.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado reservas"
            })
        } else {
            return res.status(200).json({
                status: "exito",
                contador: result.length,
                result
            })
        }
    } catch(error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al buscar reservas."
        })
    }
}

export const mostrarReservas = async (req, res) => {
    try {
        const result = await Reserve.find({}).sort({ fechaInicio: -1})
            
        return res.status(200).json({
            status: 'exito',
            contador: result.length,
            result
        }) 
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'error',
            mensaje: 'Error al buscar las reservas'
        })
    }
}

export const listarUnaReserva = async (req, res) => {
    let reservaId = req.params.id;

    try {
        let result = await Reserve.findById(reservaId);

        if (!result) {
            return res.status(404).json( {
                status: "error",
                mensaje: "No se ha encontrado la reserva"
            })
        } else {
            return res.status(200).json({
                status: "éxito",
                result
            })
        }
    } catch(error) {
        return res.status(400).json({
            status: "error",
            mensaje: "ID de reserva incorrecto o error en la búsqueda"
        })
    }
}

export const borrar_reserva = async (req, res) => {
    let reservaId = req.params.id;

    try {
        let result = await Reserve.findOneAndDelete({ _id: reservaId })

        if (!result) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al eliminar la reserva o la reservaa no existe"
            })
        } else {
            return res.status(200),json({
                status: "exito",
                mensaje: "Reserva eliminada con éxito"
            })
        }
    } catch(error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido eliminar la reserva."
        })
    }
}

// const edit_reserva = async (req, res) => {

//     let reservaId = req.params.id;

//     try {
//         let result = await Reserva.findOneAndUpdate({ _id: reservaId }, req.body, {new: true})

//         if (!result) {
//             return res.status(500).json({
//                 status: "error",
//                 mensaje: "Error al actualizar la reserva."
//             })
//         } else {
//             return res.status(200).json({
//                 status: "éxito",
//                 mensaje: "Reserva actualizada",
//                 reserva: result                
//             })
//         }
//     } catch(error) {
//         return res.status(400).json({
//             status: "error",
//             mensaje: "Error al proceesar la actualización. Datos inválidos."
//         })
//     }
// }