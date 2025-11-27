import React from 'react'
import Navbar from '../../components/navigation/navbar/mainNavbar.jsx'
import UserSidebar from '../../components/navigation/sidebar/user/usersidebar.jsx'
import UserReservations from '../../components/menus/view/menuReservaUser.jsx'

import './userdashboard.css'
const UserDashboard = () => {


  return (
    <>
      <div className="userdashboard-container">
        <Navbar />
        <div className="sidebar-reserva-container">
          <UserSidebar/>
          <UserReservations />
        </div>
      </div>
    </>
  )
}

export default UserDashboard