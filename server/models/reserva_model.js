// crear Schema JSON para las reservas
import { Schema, model} from "mongoose";

const ReserveSchema = Schema({
    cantLibro: { 
        type: Number, 
        required: true
    },

    userEmail: { 
        type: String,
        required: true
    },
 
    fechaInicio: {
        type: Date,
        default: Date.now()
    },

    fechaFinal: { 
        type: Date,
        required: true
    },

    estadoReserva: { 
        type: String,
        default: "Al día"
    }
});

export default model("Reserva", ReserveSchema, "reservas");