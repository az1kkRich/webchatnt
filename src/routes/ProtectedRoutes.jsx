import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const token = localStorage.getItem('token'); // Tokenni localStorage dan olish
  return token ? <Outlet /> : <Navigate to="/login"  /> // Agar locales mavjud bo'lsa, ichki marshrutlarni ko'rsatadi, aks holda login sahifasiga yo'naltiradi
}

export default ProtectedRoutes
