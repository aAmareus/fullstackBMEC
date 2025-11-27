import React from 'react'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import Logo from '../../img/logo-B.png'

import './mainNavbar.css'


const Navbarb = () => {
  return (
    <>
      <Navbar expand='lg' className='nav-container w-100'>
        <Container className='container'>
          <Navbar.Brand href='/'>
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Nav className='ms-auto links'>
            <Nav.Link className="nav-link" href='/'>Inicio</Nav.Link>
            <Nav.Link className="nav-link" href='/catalogo'>Catalogo</Nav.Link>
            <Nav.Link className="nav-link" href='/user/dashboard'>Mi perfil</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Navbarb