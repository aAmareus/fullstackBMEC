import mongoose from "mongoose"

export const connection = async () => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/BMEC");

        console.log("Conectado correctamente a la base de datos.");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar con la base de datos.")
    }
}
