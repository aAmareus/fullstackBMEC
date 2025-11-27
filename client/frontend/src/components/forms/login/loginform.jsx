import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import './loginform.css';

import TLogo from '../../img/logoBN.png';

const Loginform = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Función para buscar usuario en la db
    const validarUsuario = async (e) => {
        e.preventDefault();

        let validateUser = {
            correo: email,
            contrasena: password
        };
        try {
            const peticion = await fetch('http://localhost:3900/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo: email, contrasena: password })
            })

            const data = await peticion.json();
            console.log(data)

            if (data.status === "exito" && data.user) {
                // Guardar usuario en el local Storage
                localStorage.setItem('user', JSON.stringify(data.user));

                console.log('DATA LOGIN:', data)
                alert(`Bienvenid@ ${data.user.nombre}`)
                if (data.user.correo.endsWith('@bec.cl')) {
                    navigate('/admin/dashboard')
                }
                if (data.user.correo.endsWith('@gmail.com') || data.user.correo.endsWith('@hotgmail.com')) {
                    navigate('/user/dashboard')
                } else {
                    alert('El correo utilizado no está permitido en la página, por favor intente con otro correo')
                }
            }
            else {
                alert(data.mensaje || 'Error al iniciar sesión')
            }

        } catch (error) {
            console.log("Error en la petición: " + error);
        }
    }

    return (
        <>
            <Container className='login-form-container'>
                <div className="form-layout">
                    <div className="welcome-title">
                        <h3>¡Bienvenid@ a nuestra plataforma!</h3>
                    </div>
                    <div className="img-holder">
                        <img src={TLogo} alt="Logo" />
                    </div>

                    <form className="fields" name="loginFields" onSubmit={validarUsuario}>
                        <h3>¡Ingresa tus credenciales!</h3>
                        <input
                            type="text"
                            name="emailIpt"
                            id="email"
                            placeholder='Correo'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="passIpt"
                            id="pass"
                            placeholder='Contraseña'
                            value={password}
                            onChange={e => setPassword(e.target.value)} />

                        <button
                            className='btn submit-btn btn-submit'
                            type="submit">
                            <span>Iniciar sesión</span>
                        </button>

                        <span className='register-link'>
                            ¿No tienes cuenta?
                            <Link to="/register" className='redirect'> Regístrate aquí</Link>
                        </span>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default Loginform;