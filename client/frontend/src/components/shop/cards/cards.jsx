import React, { useState, useEffect } from 'react';

import './cards.css';

const Cards = () => {

  const [books, setBooks] = useState([])

  const getBooks = async () => {

    try {
      const peticion = await fetch('http://localhost:3900/api/articles', {
        method: 'GET'
      })

      const data = await peticion.json();
      setBooks(data.result)
      console.log("LIBROS RECIBIDOS: ", books.result)
    }
    catch (error) {
      console.log("Error al obtener los libros")
    }
  }

  useEffect(() => {
    getBooks()
  }, []);

  return (
    <>
      <div className="cards-container">
        {books.slice(0, 14).map(book => (
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Cards;
