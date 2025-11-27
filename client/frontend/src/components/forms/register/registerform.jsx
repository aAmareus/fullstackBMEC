import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './registerform.css';
const Registerform = () => {

  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = (e) => {
    // Lógica para registrar al usuario
    e.preventDefault();

    let newUser = {
      nombre: name,
      apellido: apellido,
      username: username,
      correo: email,
      contrasena: password
    }

    console.log(newUser);

    setTimeout(async () => {
      try {
        const peticion = await fetch('http://localhost:3900/api/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        })
        
        const data = await peticion.json();
        console.log(data)
        if (data.status === 'completado' && data.user) {

          alert("¡Usuario registrado con éxito!");
          if (data.user.correo.endsWith('@bec.cl')) {
            navigate('/admin/dashboard')
          }
           else if (data.user.correo.endsWith('@gmail.com') || data.user.correo.endsWith('@hotgmail.com')) {
            navigate('/user/dashboard')
          } else {
            alert('El correo utilizado no está permitido en la página, por favor intente con otro correo')
          }
        }
      } catch (error) {
        console.log("Error en la petición: " + error);
      }
    }, 1000)
  }

  return (
    <>
      <div className="register-form-container">
        <div className="register-form-title">
          <h2 className="text">¡Crea tu cuenta!</h2>
        </div>
        <form name="registerFields" className="register-form-layout" onSubmit={registerUser}>
          <div className="register-fields">
            <input
              type="text"
              name="nameinput"
              id="name"
              placeholder='Nombre'
              className='register-inputfield'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              name="lastnameinput"
              id="lastname"
              placeholder='Apellido'
              className='register-inputfield'
              value={apellido}
              onChange={e => setApellido(e.target.value)}
            />

            <input
              type="text"
              name="usernameinput"
              id="username"
              placeholder='Nombre de usuario'
              className='register-inputfield'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="email"
              name="emailinput"
              id="correo"
              placeholder='Correo'
              className='register-inputfield'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="passinput"
              id="password"
              placeholder='Contraseña'
              className='register-inputfield'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="button-container">
            <button
              className='btn btn-submit'
              type="submit">
              <span className='btn-text'>Registrarse</span>
            </button>

            <div className="link-text">
              <span className='login-link'>
                ¿Ya tienes cuenta?
                <Link to="/index" className='redirect'> Inicia sesión aquí</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Registerform;
