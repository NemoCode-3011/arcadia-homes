import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const ProtectedRoute = () => {
  const { isAdminAuthenticated } = useAuth()
  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/signin" />
}

export default ProtectedRoute