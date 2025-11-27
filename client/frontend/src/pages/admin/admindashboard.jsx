import React from 'react'

import Navbar from '../../components/navigation/navbar/mainNavbar.jsx';
import AdminSidebar from '../../components/navigation/sidebar/admin/adminsidebar.jsx';



import './admindashboard.css'

const AdminDashboard = () => {
  return (
    <>
      <div className="admin-dashboard-container">
          <Navbar />
          <AdminSidebar />
        </div> 
    </>
  )
}

export default AdminDashboard
