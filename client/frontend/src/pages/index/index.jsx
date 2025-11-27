import React from 'react';
import Navbar from '../../components/navigation/navbar/mainNavbar.jsx';

import LoginForm from '../../components/forms/login/loginform.jsx';
import Preview from '../../components/shop/preview/preview.jsx';
import Footer from '../../components/navigation/footer/footer.jsx';


import './index.css';
const Index = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Preview />
      <Footer />
    </>
  )
}

export default Index;