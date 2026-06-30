import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const SuperAdminRoute = () => {
  const { user } = useAuth()
  return user?.role === "super_admin" ? <Outlet /> : <Navigate to="/dashboard" />
}

export default SuperAdminRoute