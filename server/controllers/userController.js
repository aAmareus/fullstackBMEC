import fs from 'fs'
import path from 'path'
import { checkUser, checkIdUser } from "../util/validator.js"

import Usuario from "../models/user_model.js"

// Ruta de prueba
export const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Probando el controlador de usuarios"
    });
};

export const crear_usuario = async (req, res) => {
    console.log("Iniciando crear_usuario");
    console.log("Body recibido:", req.body);

    let parametros = req.body;

    try {
        console.log("Validando datos del usuario...");
        // Validar datos del usuario
        checkUser(parametros);
        console.log("Validación exitosa");

        console.log("Creando nuevo usuario...");
        // Crear y guardar usuario
        const usuario = new Usuario(parametros);
        console.log("Modelo de usuario creado:", usuario);

        console.log("Guardando en la base de datos...");
        const usuarioGuardado = await usuario.save();
        console.log("Usuario guardado exitosamente:", usuarioGuardado);

        return res.status(200).json({
            status: "completado",
            user: usuarioGuardado,
            mensaje: "El usuario ha sido creado de manera exitosa"
        });

    } catch (error) {
        console.log("Error detallado:", error);
        console.log("Stack trace:", error.stack);

        // Error de validación de mongoose
        if (error.name === 'ValidationError') {
            console.log("Error de validación de Mongoose");
            return res.status(400).json({
                status: "error",
                mensaje: "Error de validación",
                detalles: Object.values(error.errors).map(err => err.message)
            });
        }

        // Error de validación nuestra
        if (error.message && error.message.includes("Error al validar")) {
            console.log("Error en nuestra validación");
            return res.status(400).json({
                status: "error",
                mensaje: "Datos del usuario incompletos o incorrectos",
                detalles: error.message
            });
        }

        // Error de base de datos u otros
        console.log("Error no esperado");
        return res.status(500).json({
            status: "error",
            mensaje: "Error al guardar el usuario en la base de datos",
            detalles: error.message
        });
    }
}

export const listar_usuarios = async (req, res) => {

    try {
        let consulta = Usuario.find({});

        if (req.params.ultimos) {
            consulta.limit(req.params.ultimos);
        }

        let resultado = await consulta.sort({ fecha: -1 });

        if (!resultado || resultado.length === 0) {
            return res.status(200).json({
                status: "exito",
                contador: 0,
                result: []
            });
        }
        return res.status(200).json({
            status: "exito",
            contador: resultado.length,
            result: resultado
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            mensaje: "No se ha logrado encontrar a ningun usuario"
        });
    }
}

export const listar_un_usuario = async (req, res) => {
    let userId = req.params.id;

    try {
        // Validar que el username existe
        if (!userId) {
            return res.status(400).json({
                status: "error",
                mensaje: "El nombre de usuario es requerido"
            });
        }

        // Buscar usuario por username
        let resultado = await Usuario.findOne({ _id: userId });

        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el usuario"
            });
        }

        return res.status(200).json({
            status: "exito",
            usuario: resultado
        });

    } catch (error) {
        console.log("Error al buscar usuario:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar el usuario",
            detalles: error.message
        });
    }
}

export const login = async (req, res) => {
    const { correo, contrasena } = req.body

    try {
        const user = await Usuario.findOne({ correo, contrasena });

        if (!user) {
            return res.status(400).json({
                status: "error",
                mensaje: "Usuario o contraseña incorrectos"
            })
        }

        return res.status(200).json({
            status: "exito",
            user: {
                id: user._id,
                nombre: user.nombre,
                apellido: user.apellido,
                username: user.username,
                correo: user.correo
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al procesar la solicitud de login",
            detalles: error.message
        })
    }
}

export const borrar_usuario = async (req, res) => {
    let userId = req.params.id;
    try {
        let resultado = await Usuario.findOneAndDelete({ _id: userId });

        if (!resultado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Se produjo un error al intentar borrar el usuario"
            });
        } else {
            return res.status(200).json({
                status: "exito",
                mensaje: "El usuario ha sido borrado exitosamente"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha logrado borrar el usuario"
        });
    }
}

export const editar_usuario = async (req, res) => {

    let userId = req.params.id;

    try {

        let resultado = await Usuario.findOneAndUpdate({ _id: userId }, req.body, { new: true });

        if (!resultado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Se produjo un error al intentar actualizar el usuario"
            });
        } else {
            return res.status(200).json({
                status: "exito",
                usuario: resultado,
                mensaje: "El usuario ha sido actualizado correctamente"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }
}