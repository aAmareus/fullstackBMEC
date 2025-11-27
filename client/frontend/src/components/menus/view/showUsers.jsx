import React, { useState, useEffect } from 'react'

import TrashIcon from '../../img/icons/trash-light.svg'
import './showUser.css'

const ShowUsers = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const peticion = await fetch('http://localhost:3900/api/users', {
                method: 'GET'
            })

            const data = await peticion.json()

            if (data.status === 'exito') {
                setUsers(data.result)
            } else {
                alert(data.mensaje || 'Error al obtener usuarios')
            }
        } catch (error) {
            console.log("Error al obtener ususarios: ", error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const deleteUser = async (id) => {
        try {
            const peticion = await fetch(`http://localhost:3900/api/users/delete/${id}`, {
                method: 'DELETE'
            })

            const data = await peticion.json()

            if (data.status === 'exito') {
                alert('Usuario eliminado correctamente')
                setUsers(users.filter(user => user._id !== id))
            } else {
                alert(data.mensaje || 'Error al eliminar usuario')
            }
        } catch (error) {
            console.log('Error al eliminar el usuario: ', error)
        }
    }

    return (
        <>
            <div className="previewUser-container">
                <div className="title">
                    <h2>Usuarios del sistema:</h2>
                </div>
                {users.length === 0 ? (
                    <p>No hay usuarios registrados</p>
                ) : (
                    <table className="userTable">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.nombre} {user.apellido}</td>
                                    <td>{user.username}</td>
                                    <td>{user.correo}</td>
                                    <td>
                                        <button className="trashbtn" onClick={() => deleteUser(user._id)}>
                                            <img src={TrashIcon} alt="Eliminar usuario" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </>
    )
}

export default ShowUsers
