import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './menuReservaUser.css'

const MenuReservaUser = () => {

    const [reservas, setReservas] = useState([])
    const getReservas = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const correo = user?.correo;

            const peticion = await fetch(`http://localhost:3900/api/reserva/mostrar/${correo}`, {
                method: "GET"
            });

            const data = await peticion.json();

            if (data.status === "exito") {
                setReservas(data.result);
            } else {
                alert(data.mensaje || "Error al obtener reservas");
            }
        } catch (error) {
            console.error("Error al obtener reservas:", error);
        }
    };

    useEffect(() => {
        getReservas();
    }, []);


    return (
        <>
            <div className="menuReserva-container">
                <div className="resVisualizer">
                    <h3 className="resTitle">
                        Mis Reservas
                    </h3>
                    <div className="resItems">
                        {/* Mapeo de las reservas */}
                        {reservas.length === 0 ? (
                            <span className='protip'>No tienes reservas. ¿Porque no intentas conseguir una?</span>
                        ) : (
                            <table className="reservas-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Cantidad de Libros</th>
                                        <th>Fecha Inicio</th>
                                        <th>Fecha Final</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservas.map((reserva, index) => (
                                        <tr key={reserva._id}>
                                            <td>{index + 1}</td>
                                            <td>{reserva.cantLibro}</td>
                                            <td>{new Date(reserva.fechaInicio).toLocaleDateString()}</td>
                                            <td>{new Date(reserva.fechaFinal).toLocaleDateString()}</td>
                                            <td>{reserva.estadoReserva}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        )}
                    </div>

                </div>
                <div className="resBtnContainer">
                    <Link to={'/catalogo'}
                        className="button-redirect">
                        Nueva reserva
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MenuReservaUser