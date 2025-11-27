import React, { useState, useEffect } from "react";
import './showBooks.css'

const ShowBooks = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [loading, setLoading] = useState(true)

    // Obtener artículos
    const getBooks = async () => {
        try {

            const res = await fetch("http://localhost:3900/api/articles");
            const data = await res.json();
            console.log('Respuesta del BackEnd: ', data)
            if (data.status === "exito") {
                setBooks(data.result);
            } else {
                console.warn('No se pudieron obtener los libros')
            }
        } catch(error) {
            console.error('Error al obtener los libros.')
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    // Eliminar artículo
    const deleteBook = async (id) => {
        try {
            const res = await fetch(`http://localhost:3900/api/delete-articles/${id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.status === "éxito") {
                alert("Artículo eliminado correctamente");
                setBooks(books.filter((b) => b._id !== id));
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            console.error("Error al eliminar artículo", error);
        }
    };

    // Editar artículo
    const editBook = async (id) => {
        try {
            const res = await fetch(`http://localhost:3900/api/edit/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    titulo: editingBook.titulo,
                    genero: editingBook.genero,
                    categoria: editingBook.categoria,
                    autor: editingBook.autor,
                    lanzamiento: editingBook.lanzamiento
                })
            });
            const data = await res.json();
            if (data.status === "éxito") {
                alert("Artículo actualizado correctamente");
                setBooks(books.map((b) => (b._id === id ? data.articulo : b)));
                setEditingBook(null);
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            console.error("Error al editar artículo", error);
        }
    };

    return (
        <div className="showBooks-container">
            <h2>Lista de artículos</h2>
            <table className="books-table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td>{book.titulo}</td>
                            <td>{book.autor}</td>
                            <td>
                                <button onClick={() => setEditingBook(book)} className="edit-button">Editar</button>
                                <button onClick={() => deleteBook(book._id)} className="del-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulario de edición */}
            {editingBook && (
                <form
                    className="edit-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        editBook(editingBook._id);
                    }}
                >
                    <h3>Editando: {editingBook.titulo}</h3>
                    <input
                        type="text"
                        value={editingBook.titulo}
                        onChange={(e) =>
                            setEditingBook({ ...editingBook, titulo: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={editingBook.autor}
                        onChange={(e) =>
                            setEditingBook({ ...editingBook, autor: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={editingBook.genero}
                        onChange={(e) =>
                            setEditingBook({ ...editingBook, genero: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        value={editingBook.categoria}
                        onChange={(e) =>
                            setEditingBook({ ...editingBook, categoria: e.target.value })
                        }
                    />
                    <input
                        type="date"
                        value={editingBook.lanzamiento}
                        onChange={(e) =>
                            setEditingBook({ ...editingBook, lanzamiento: e.target.value })
                        }
                    />

                    <button type="submit">Guardar cambios</button>
                    <button type="button" onClick={() => setEditingBook(null)}>
                        Cancelar
                    </button>
                </form>
            )}
        </div>
    );
};

export default ShowBooks;
