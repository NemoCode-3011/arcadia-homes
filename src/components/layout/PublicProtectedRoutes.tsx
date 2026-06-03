import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const PublicProtectedRoute = () => {
  const { isUserAuthenticated } = useAuth()
  return isUserAuthenticated ? <Outlet /> : <Navigate to="/signup" />
}

export default PublicProtectedRoute