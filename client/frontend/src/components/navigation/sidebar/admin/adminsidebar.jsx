import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

// Importing Icons
import UsersIcon from '../../../img/icons/user-alt.svg'
import RecentlyIcon from '../../../img/icons/time.svg'
import BookIcon from '../../../img/icons/books.svg'
import EditIcon from '../../../img/icons/pen.svg'
import UploadIcon from '../../../img/icons/upload.svg'
import LogoutIcon from '../../../img/icons/logout.svg'

//import modals
import ShowUsers from '../../../menus/view/showUsers.jsx'
import ShowReservas from '../../../menus/view/showReservas.jsx'
import CreateBook from '../../../menus/view/createBook.jsx'
import ShowBooks from '../../../menus/view/showBooks.jsx'

import './adminsidebar.css';

const AdminSidebar = () => {

    const navigate = useNavigate()
    const user = localStorage.getItem('user')

    const [activeView, setActiveView] = useState(null)

    const closeSesion = () => {
        alert('Has cerrado sesión')
        // Esperar un tiempo para que redirija
        setTimeout(async () => {
            localStorage.removeItem('user')
            navigate('/')
        }, 1000)
    }

    return (
        <>
            <div className="sidebar-modal-container" >
                <div className="sidebar-container">
                    <ul className="sidebar-list">
                        <li className="sidebar-item viewUsers" onClick={() => setActiveView('users')}>
                            <p>
                                Usuarios
                            </p>
                            <span>
                                <img src={UsersIcon} alt="" />
                            </span>
                        </li>
                        <li className="sidebar-item viewReservas" onClick={() => setActiveView('reservas')}>
                            <p>
                               Reservas
                            </p>
                            <span>
                                <img src={RecentlyIcon} alt="" />
                            </span>
                        </li>
                        <li className="sidebar-item toCatalog">
                            <Link className='toCatalog' to={'/catalogo'}>
                                <p className='toCatalogo'>
                                    Catálogo
                                </p>
                                <span>
                                    <img src={BookIcon} alt="" />
                                </span>

                            </Link>
                        </li>
                        <li className="sidebar-item createBook" onClick={() => setActiveView('createBook')}>
                            <p>
                               Subir Libros
                            </p>
                            <span>
                                <img src={UploadIcon} alt="" />
                            </span>
                        </li>
                        <li className="sidebar-item showBooks" onClick={() => setActiveView('books')}>
                            <p>
                                Editar / Eliminar Libros
                            </p>
                            <span>
                                <img src={EditIcon} alt="" />
                            </span>
                        </li>
                        <li className="sidebar-item" onClick={closeSesion}>
                            <p>
                                Cerrar Sesión
                            </p>
                            <span>
                                <img src={LogoutIcon} alt="" />
                            </span>
                        </li>
                    </ul>
                </div>

               <div className="sidebar-content">
                {activeView === 'users' && <ShowUsers/> }
                {activeView === 'reservas' && <ShowReservas />}
                {activeView === 'createBook' && <CreateBook />}
                {activeView === 'books' && <ShowBooks />}
               </div>
            </div>
        </>
    )
}

export default AdminSidebar;