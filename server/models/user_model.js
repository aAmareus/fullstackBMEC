// Crear el Esquema del JSON para la entidad Usuario
import { Schema, model } from "mongoose"

const UserSchema = Schema({
    rol: {
        type: String,
        default: "usuario",
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    estado_cuenta: {
        type: String,
        default: "activa",
    }
})

export default model("User", UserSchema, "users");