import React, { useState, useEffect } from 'react'
import CartIcon from '../../img/icons/cart.svg'
import TrashIcon from '../../img/icons/trash-light.svg'
import './fullcatalogo.css'


function FullCatalogo() {
    const [catalogo, setCatalogo] = useState([])
    const [cart, setCart] = useState([])
    const [fechaFinal, setFechaFinal] = useState([])
    // Funcion para obtener los select
    const [year, setYear] = useState('')
    const [genre, setGenre] = useState('')
    const [type, setType] = useState('')
    const [search, setSearch] = useState('')


    // LLama a la API para obtener el catalogo
    const getCatalogo = async () => {
        try {
            const peticion = await fetch('http://localhost:3900/api/articles', {
                method: 'GET'
            })
            const data = await peticion.json();
            setCatalogo(data.result)
            console.log("LIBROS RECIBIDOS: ", catalogo)
        }
        catch (error) {
            console.log("Error al obtener el catálogo")
        }
    }

    // Llamar a la API para crear una reserva
    const createreserva = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const email = user?.correo || "";

            if (!email) {
                alert("No se encontró el correo del usuario en localStorage");
                return;
            }

            if (!fechaFinal) {
                alert("Debes seleccionar una fecha final");
                return;
            }

            const reservaData = {
                cantLibro: cart.length,
                userEmail: email,
                fechaInicio: new Date().toISOString(),
                fechaFinal: fechaFinal,
                estadoReserva: "Al día"
            };

            const peticion = await fetch("http://localhost:3900/api/reserva/crear", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservaData)
            });

            const data = await peticion.json();
            console.log("Reserva creada:", data);

            if (data.status === "error") {
                alert("Error: " + data.mensaje);
            } else {
                alert("Reserva creada con éxito");
                setCart([])
                localStorage.setItem('cart', JSON.stringify([]))
            }
        } catch (error) {
            console.error("Error al crear la reserva:", error);
        }
    }


    // obtiene el catalogo
    useEffect(() => {
        getCatalogo()
    }, [])

    // Reinicia los filtro de búsqueda
    const restartFilters = () => {
        setYear('')
        setGenre('')
        setType('')
        setSearch('')
    }

    // obtiene el catalogo filtrado
    const filteredCatalog = catalogo.filter(book => {
        const validYear = year
            ? book.lanzamiento >= parseInt(year) && book.lanzamiento < parseInt(year) + 10 : true
        const validCategory = type ? book.categoria === type : true
        const validGenre = genre ? book.genero === genre : true
        const validSearch = search ? book.titulo.toLowerCase().includes(search.toLowerCase()) : true

        return validYear && validCategory && validGenre && validSearch
    })

    // Obtiene el carrito de localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || []
        setCart(storedCart)
    }, [])

    // Función para agregar al carro
    const addToCart = (book) => {
        const bookData = {
            titulo: book.titulo,
            autor: book.autor
        }
        const updatedCart = [...cart, bookData]
        setCart(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))

    }

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove)
        setCart(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    return (
        <>
            {/* Shopping Cart */}
            <div className="shoppingCart-container">
                <div className="button-container">
                    <button className="shoppingcart-toggle" disabled={true}>
                        <img src={CartIcon} alt="" />
                    </button>
                </div>

                <div className="displaybooks">
                    {cart.length === 0 ? (
                        <span className='nobooksyet'>No has agregado nada todavía</span>
                    ) : (
                        cart.map((book, index) => (
                            <div className="cart-card" key={index}>
                                <div className="bookcartinfo">
                                    <div className="bookcart-title">
                                        <span>{book.titulo}</span>
                                    </div>
                                    <div className="bookcart-autor">
                                        <span>{book.autor}</span>
                                    </div>
                                </div>
                                <div className="removebook">
                                    <button className='removebookbtn' onClick={() => removeFromCart(index)}>
                                        <img src={TrashIcon} alt="" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="reserva-container">
                        <input
                            type="date"
                            value={fechaFinal}
                            onChange={(e) => setFechaFinal(e.target.value)}
                            className='input-last-date'
                            placeholder='Seleccione una fecha de entrega'
                        />
                        <button className="createreserva" onClick={createreserva}>Reservar</button>
                    </div>
                )}
            </div>

            {/* Barra de búsqueda*/}
            <div className="search-menu">
                <div className="search-input">
                    <input
                        type="text"
                        name='searchbarinput'
                        placeholder='Buscar'
                        id='input-title'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="dropdown-menu">
                    <div className="category year">
                        <select
                            name=""
                            id="year-category"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                        >
                            <option className='option' value="" disabled>Año</option>
                            <option className='option' value="1940">1940</option>
                            <option className='option' value="1950">1950</option>
                            <option className='option' value="1960">1960</option>
                            <option className='option' value="1970">1970</option>
                            <option className='option' value="1980">1980</option>
                            <option className='option' value="1990">1990</option>
                            <option className="option" value="2000">2000</option>
                            <option className="option" value="2010">2010</option>
                            <option className="option" value="2020">2020</option>
                        </select>
                    </div>

                    <div className="category categoria">
                        <select
                            name=""
                            id="type-category"
                            value={type}
                            onChange={e => setType(e.target.value)}>

                            <option className='option' value="" disabled>Categoría</option>
                            <option className='option' value="Todas las edades">Para todos</option>
                            <option className='option' value="Infantil">Infantiles</option>
                            <option className='option' value="Adolescentes">Adolescentes</option>
                            <option className='option' value="Mayores de 18">Mayores de edad</option>
                        </select>
                    </div>

                    <div className="category genero">
                        <select
                            name=""
                            id="genre-category"
                            value={genre}
                            onChange={e => setGenre(e.target.value)}>

                            <option className='option' value="" disabled>Género</option>
                            <option className='option' value="Academico">Academicos</option>
                            <option className='option' value="Comedia">Comedia</option>
                            <option className='option' value="Romance">Romance</option>
                            <option className='option' value="Documental">Documental</option>
                            <option className='option' value="Terror">Terror</option>
                            <option className='option' value="Misterio">Misterio</option>
                            <option className='option' value="Tragedia">Tragedia</option>
                            <option className='option' value="Aventura">Aventura</option>
                            <option className='option' value="Accion">Acción</option>
                            <option className='option' value="Drama">Drama</option>
                            <option className='option' value="Poesia">Poesía</option>
                            <option className='option' value="Ficcion">Ficción</option>
                            <option className='option' value="No ficcion">No ficción</option>
                            <option className='option' value="Guía">Guía</option>
                        </select>
                    </div>
                    <button className="clearfilter" onClick={restartFilters}>
                        Reiniciar
                    </button>
                </div>
            </div>

            {/* CATALOGO */}
            <div className="catalogo-container">
                <div className="allcards-container">
                    {filteredCatalog.map(book => (
                        <div className="card" key={book._id}>
                            <div className="content">
                                <div className="back">
                                    <div className="back-content">
                                        <img src={`http://localhost:3900/api/imagen/${book.img}`} alt="Book Cover" />
                                    </div>
                                </div>

                                <div className="front">

                                    <div className="img">
                                        <div className="circle"></div>
                                        <div className="circle" id='right'></div>
                                        <div className="circle" id='bottom'></div>
                                    </div>

                                    <div className="front-content">
                                        <small className='badge'>{book.titulo}</small>
                                        <div className="description">
                                            <div className="title">
                                                <p className='title'>
                                                    <strong>{book.autor}</strong>
                                                </p>


                                            </div>
                                            <p className='card-footer'>
                                                {new Date(book.lanzamiento).getFullYear()} &nbsp; |   {book.categoria} &nbsp; | {book.genero}
                                            </p>
                                            <div className="addToCart-container">
                                                <button className='addToCartBtn' onClick={() => addToCart(book)}>
                                                    <img
                                                        src={CartIcon}
                                                        alt="Cart icon"
                                                        className='btn-img' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default FullCatalogo


