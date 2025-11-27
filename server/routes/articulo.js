import express from 'express';
import multer from 'multer';

import { test, create, listar, listarUno, deletee, edit, upload, image, browser } from "../controllers/articleController.js";

const router = express.Router()

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './img/articles/')
    },

    filename: function(req, file, cb) {
        cb(null, 'articulo' + Date.now() + file.originalname)
    }
})

export const subidas = multer({storage: storage});


// rutas de prueba para la gestión de artículos.
router.get('/test', test)


// Rutas de prueba para la gestión de la colección articulos
router.post('/create', subidas.single("img"), create);
router.get('/articles', listar);
router.get('/listar-articles/:ultimos', listar);
router.get('/list-one-article/:id', listarUno);
router.delete('/delete-articles/:id', deletee);
router.put('/edit/:id', edit);
router.get('/imagen/:fichero', image);
router.get('/buscar/:busqueda', browser);

export default router