import {Routes, Route} from 'react-router-dom'

import Index from './pages/index/index.jsx'
import Catalogo from './pages/catalogo/catalogo.jsx'
import Register from './pages/register/register.jsx'
import Usuario from './pages/user/userdashboard.jsx'
import Admin from './pages/admin/admindashboard.jsx'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/catalogo" element={<Catalogo />}/>
        <Route path="/register" element={<Register />}/>
        <Route path='/user/dashboard' element={<Usuario />}/>
        <Route path='/admin/dashboard' element={<Admin />}/>
        <Route path='/support'/>
      </Routes>
    </>
  )
}

export default App
