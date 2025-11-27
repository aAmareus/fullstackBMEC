import {connection} from "./database/connection.js";
import express from 'express';
import cors from 'cors';

import path from 'path';

console.log("App inicializada")

connection();

const app = express();
const puerto = 3900;

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/img/articles', express.static(path.join(process.cwd(), 'img/articles')))
import article_routes from "./routes/articulo.js";
import user_routes from "./routes/user.js";
import reserve_routes from "./routes/reserva.js";

// Usar cada router individualmente
app.use("/api", article_routes);
app.use("/api", user_routes);
app.use("/api", reserve_routes);


app.get("/testing", (req, res) => {
    console.log("Se ejecutó el endpoint 'testing'");

    return res.status(200).json([{
        curso: "Desarrollo Web",
        autor: "yo el chupa",
        url: "https://youtube.com"
    }, {
        curso: "Desarrollo Web1",
        autor: "yo el chupa2",
        url: "https://instagram.com"
    }]);
});

app.get("/", (req, res) => {
    return res.status(200).send(
        "<h1>Empezando a crear una API REST con Node.js</h1>"
    );
});

app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " + puerto)
});