import React, { useEffect, useState } from 'react';
import './showReservas.css'

function ShowReservas() {
    const [reservas, setReservas] = useState([]);

    const getReservas = async () => {
        try {
            const peticion = await fetch('http://localhost:3900/api/reserva/mostrar', {
                method: 'GET'
            })

            const data = await peticion.json()

            if (data.status === 'exito') {
                setReservas(data.result)
            } else {
                alert(data.mensaje || 'Error al obtener las reservas')
            }
        } catch (error) {
            console.log("Error al obtener las reservas: ", error)
        }
    }

    useEffect(() => {
        getReservas()
    }, [])

    const handleDelete = (id) => {
        alert(`Eliminar reserva con ID: ${id}`);
    };

    return (
        <div className="showReservas">
            <div className="reservasTotal">
                <h3>Reservas totales:</h3>
            </div>
            <div className="reservas-container">
                <table className="table-content">
                    <thead className="thead">
                        <tr className="trow">
                            <th>Reserva</th>
                            <th>Libros</th>
                            <th>Inicio</th>
                            <th>Final</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {reservas.length === 0 ? (
                            <tr>
                                <td colSpan="5">No hay reservas registradas</td>
                            </tr>
                        ) : (
                            reservas.map((reserva, index) => (
                                <tr className="tr" key={reserva._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {reserva.cantLibro}
                                    </td>
                                    <td>
                                        {new Date(reserva.fechaInicio).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {new Date(reserva.fechaFinal).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {reserva.estadoReserva}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowReservas