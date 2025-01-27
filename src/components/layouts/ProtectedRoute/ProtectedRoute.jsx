import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = () => {
  const token = Cookies.get('accessToken')

  if (!token) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default ProtectedRoute
