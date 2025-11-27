import React from 'react' // <---
// Importar Navbar y Footer

import Navbar from '../../components/navigation/navbar/mainNavbar.jsx';
import Footer from '../../components/navigation/footer/footer.jsx';

import FullCatalogo from '../../components/shop/full/fullCatalog.jsx'
import './catalogo.css'
const Catalogo = () => {
  return (
    <>
      <div className="page-catalogo-container">
        <Navbar />

        <FullCatalogo />
        {/* ACA VA EL CATALOGO */}
        <Footer />
      </div>

    </>
  )
}

export default Catalogo