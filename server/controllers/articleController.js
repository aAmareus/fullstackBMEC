import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { checkArticle, checkIdArticle } from "../util/validator.js";


import Article from "../models/article_model.js";

// Necesario para __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
//        TEST
// =========================
export const test = (req, res) => {
  return res.status(200).json({
    mensaje: "Mensaje de prueba",
  });
};

// =========================
//      CREATE
// =========================
export const create = async (req, res) => {
  let params = req.body;

  try {
    checkArticle(params);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar.",
    });
  }

  try {
    if (req.file) {
      params.img = req.file.filename
    }
    const article = new Article(params);
    await article.save();

    return res.status(200).json({
      status: "exito",
      articulo: params,
      mensaje: "Artículo creado con éxito",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "error",
      mensaje: "Error al"
    })
  }
};

// =========================
//        LISTAR
// =========================
export const listar = async (req, res) => {
  try {
    let consulta = Article.find({});
    if (req.params.ultimos) {
      consulta = consulta.limit(req.params.ultimos);
    }

    let result = await consulta.sort({ lanzamiento: -1 });

    if (!result) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado artículos.",
      });
    }

    return res.status(200).json({
      status: "exito",
      counter: result.length,
      result,
    });
  } catch (error) { return res.status(400).json({ status: "error", mensaje: "No se encuentran artículos.", }); }
};

// =========================
//        LISTAR UNO
// =========================
export const listarUno = async (req, res) => {
  let id = req.params.id;

  try {
    checkIdArticle(id);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "ID con formato incorrecto",
    });
  }

  try {
    let result = await Article.findById(id);

    if (!result) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se ha encontrado el artículo",
      });
    }

    return res.status(200).json({
      status: "éxito",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se ha encontrado el artículo",
    });
  }
};

// =========================
//        DELETE
// =========================
export const deletee = async (req, res) => {
  try {
    let articleId = req.params.id;
    checkIdArticle(articleId);

    let result = await Article.findOneAndDelete({ _id: articleId });

    if (!result) {
      return res.status(500).json({
        status: "error",
        mensaje: "Error al borrar el artículo",
      });
    }

    return res.status(200).json({
      status: "éxito",
      mensaje: "Artículo borrado",
      articulo: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje:
        "No se ha podido borrar el artículo, revise los argumentos/atributos.",
    });
  }
};

// =========================
//          EDIT
// =========================
export const edit = async (req, res) => {
  let articleId = req.params.id;
  let params = req.body;

  try {
    checkArticle(params);

    let result = await Article.findOneAndUpdate(
      { _id: articleId },
      params,
      { new: true }
    );

    if (!result) {
      return res.status(500).json({
        status: "error",
        mensaje: "Error al editar el artículo.",
      });
    }

    return res.status(200).json({
      status: "éxito",
      mensaje: "Artículo actualizado con éxito.",
      articulo: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar.",
    });
  }
};

// =========================
//        UPLOAD IMG
// =========================
export const upload = async (req, res) => {
  try {
    // Validar file
    if (!req.file) {
      return res.status(404).json({
        status: "error",
        mensaje: "Petición inválida",
      });
    }

    let archivo = req.file.originalname;
    let extension = archivo.split(".").pop().toLowerCase();

    // Validar extensión
    const allowed = ["png", "jpg", "jpeg", "heic", "jfif"];

    if (!allowed.includes(extension)) {
      fs.unlink(req.file.path, () => {
        return res.status(400).json({
          status: "error",
          mensaje: "Imagen inválida",
        });
      });
    }

    let articleId = req.params.id;

    let result = await Article.findOneAndUpdate(
      { _id: articleId },
      { img: req.file.filename },
      { new: true }
    );

    if (!result) {
      return res.status(500).json({
        status: "error",
        mensaje: "Error al actualizar imagen",
      });
    }

    return res.status(200).json({
      status: "éxito",
      mensaje: result,
      fichero: req.file,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error al actualizar",
    });
  }
};

// =========================
//       SERVIR IMAGEN
// =========================
export const image = (req, res) => {
  let fichero = req.params.fichero;
  let ruta = path.join(__dirname, "../img/articles/", fichero);

  fs.stat(ruta, (err, exist) => {
    if (!err && exist) {
      return res.sendFile(path.resolve(ruta));
    }

    return res.status(404).json({
      status: "error",
      mensaje: "La imagen no existe",
      fichero,
    });
  });
};

// =========================
//         BUSCADOR
// =========================
export const browser = async (req, res) => {
  let search = req.params.busqueda; // si tu ruta tiene el typo, lo dejo igual

  let consulta = Article.find({
    $or: [
      { titulo: { $regex: search, $options: "i" } },
      { autor: { $regex: search, $options: "i" } },
    ],
  });

  let result = await consulta.sort({ lanzamiento: -1 });

  if (!result || result.length <= 0) {
    return res.status(404).json({
      status: "error",
      mensaje: "No se han encontrado artículos",
    });
  }

  return res.status(200).json({
    status: "éxito",
    articulos: result,
  });
};