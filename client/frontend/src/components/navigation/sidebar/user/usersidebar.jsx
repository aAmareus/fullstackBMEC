import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Usericon from '../../../img/icons/user.svg'
import LogoutIcon from '../../../img/icons/logout.svg'
import './usersidebar.css'

const Usersidebar = () => {

  const [visible, setvisible] = useState(false)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')


  // Obtener el ususario del almacenamiento local
  const user = JSON.parse(localStorage.getItem('user'))

  const handleToggle = (e) => {
    e.preventDefault()
    setvisible(prev => !prev)
  }

  // Function to edit info 
  const edit_user = (e) => {
    e.preventDefault()

    let updatedUser = {
      id: user.id,
      nombre: name || user.nombre ,
      apellido: lastname || user.apellido,
      username: username || user.username,
      correo: email || user.correo,
      contrasena: pass || user.contrasena
    }

    setTimeout(async () => {
      try {
        const peticion = await fetch(`http://localhost:3900/api/edit-user/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser)
        })

        const data = await peticion.json()
        console.log(data)

        if (data.status === 'error') {
          alert('Hubo un error al editar el usuario')
        } else {
          alert('Has cambiado tus credenciales con éxito!')
          localStorage.setItem('user', JSON.stringify(updatedUser))
        }
      } catch (error) {
        console.log("Error en la petición" + error)
      }
    }, 500)

  }

  const closeSesion = () => {
    alert('Has cerrado sesión')
    // Esperar un tiempo para que redirija
    setTimeout(async() => {
      localStorage.removeItem('user')
      navigate('/')
    }, 1000)
  }

  return (
    <>
      <div className="usersidebar-container">
        <div className="userpfp">
          <img src={Usericon} alt="Icono de perfil" />
          <strong className='username-hello'>
            Bievenid@ {user.nombre}
          </strong>
        </div>

        <div className="userinfo">
          <div className="info-name">
            <b>Nombre:</b> <span>{user.nombre}</span>
          </div>
          <div className="info-lastname">
            <b>Apellido: </b> <span>{user.apellido}</span>
          </div>
          <div className="info-username">
            <b>Nombre de usuario:</b> <span>{user.username}</span>
          </div>
          <div className="info-email">
            <b>Correo:</b> <span>{user.correo}</span>
          </div>
        </div>

        <div className='editInfo-user'>
          <button
            className='editInfo-button'
            onClick={handleToggle}>
            Editar
          </button>
        </div>

        <div className="logout-user">
          <button 
            className="logout-btn" 
            onClick={closeSesion}>
            <span>Cerrar sesión</span>
            <img src={LogoutIcon}/>
          </button>
        </div>
      </div>


      {/* MODAL FOR APLY CHANGES TO THE INFO */}
      <div
        className="editUser-container"
        style={{ display: visible ? 'flex' : 'none' }}
      >
        <form
          className="editUserForm">
          <input
            type="text"
            id='editName-input'
            className='editName inputform'
            name='Editar nombre'
            placeholder='Nuevo nombre'
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="text"
            id='editLastname-input'
            className='editLastName inputform'
            name='Editar Apellido'
            placeholder='Nuevo apellido'
            value={lastname}
            onChange={e => setLastName(e.target.value)}
          />

          <input
            type="text"
            id='editUserName-input'
            className='editUserName inputform'
            name='Editar nickname'
            placeholder='Nuevo nombre de usuario'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="text"
            id='editEmail-input'
            className='editEmail inputform'
            name='Editar correo electrónico'
            placeholder='Nuevo correo electrónico'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            id='editPass-input'
            className='editPass inputform'
            name='Editar contraseña'
            placeholder='Nueva contraseña'
            value={pass}
            onChange={e => setPass(e.target.value)}
          />

          <div className="changeBtn-container">
            <button
              type="submit"
              className='saveChanges-btn btn'
              onClick={edit_user}>
              Actualizar
            </button>

            <button
              type="button"
              className='cancel-btn btn'
              onClick={handleToggle}>
              Cancelar
            </button>
          </div>
        </form>

      </div>
    </>
  )
}

export default Usersidebar
