import React, { useState } from 'react'
import './createBook.css'

const CreateBook = () => {

    // useState para cada input
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [cat, setCat] = useState('')
    const [author, setAuthor] = useState('')
    const [release, setRelease] = useState('')
    const [cover, setCover] = useState(null)

    const createBook = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("titulo", title)
        formData.append("genero", genre)
        formData.append("categoria", cat)
        formData.append("autor", author)
        formData.append("lanzamiento", release)
        formData.append("img", cover)

        try {
            const peticion = await fetch('http://localhost:3900/api/create', {
                method: 'POST',
                body: formData
            })

            const data = await peticion.json()
            console.log("Respuesta backend: ", data)

            if (data.status === 'exito') {
                alert('Artículo creado con éxito')

                setTitle('')
                setGenre('')
                setCat('')
                setAuthor('')
                setRelease('')
                setCover(null)
            } else {
                alert(data.mensaje || 'Error al subir el artículo')
            }
        } catch(error) {
            console.log("Error al crear el archivo", error)
        }

    }

    return (
        <>
            <div className="createNewBook-container">
                <h2>Ingresa un nuevo articulo al catálogo</h2>
                <form
                    className='create-inputs'
                    onSubmit={createBook}>

                    <input
                        type="text"
                        name='titleinput'
                        id='title'
                        placeholder='Título'
                        className='create-input'
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        name='genreinput'
                        id='genre'
                        placeholder='Genero'
                        className='create-input'
                        required
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                    />
                    <input
                        type="text"
                        name='catinput'
                        id='category'
                        placeholder='Categoría'
                        className='create-input'
                        required
                        value={cat}
                        onChange={e => setCat(e.target.value)}
                    />
                    <input
                        type="text"
                        name='authorinput'
                        id='author'
                        placeholder='Autor'
                        className='create-input'
                        required
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <input
                        type="date"
                        name='releaseinput'
                        id='release'
                        placeholder='Lanzamiento'
                        className='create-input'
                        required
                        value={release}
                        onChange={e => setRelease(e.target.value)}
                    />
                    <input
                        type="file"
                        name='coverinput'
                        id='cover'
                        placeholder=''
                        className='create-input'
                        onChange={e => setCover(e.target.files[0])}
                    />

                    <button
                        type='submit'
                        className='uploadarticlebtn'>
                        Subir artículo
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateBook
