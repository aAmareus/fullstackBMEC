import React from 'react'

import NavBar from '../../components/navigation/navbar/mainNavbar.jsx'
import RegisterForm from '../../components/forms/register/registerform.jsx'
import Footer from '../../components/navigation/footer/footer.jsx'

import './register.css'

const Register = () => {
  return (
    <>
      <div className="registerpage">
        <NavBar />
        <RegisterForm />
        <Footer />
      </div>
    </>
  )
}

export default Register
