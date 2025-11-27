// Crear el esquema JSON para los artículos
import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  lanzamiento: {
    type: Date,
    required: true,
  },
  img: {
    type: String,
    default: "default.jpg",
  },
});

export default model("Article", ArticleSchema, "articles");