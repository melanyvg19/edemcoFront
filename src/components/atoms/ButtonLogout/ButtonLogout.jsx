import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './ButtonLogout.css'

const ButtonLogout = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    navigate('/')
  }

  return (
    <button className="btn-session" onClick={logout}>
      <i className="fa-solid fa-right-from-bracket" title="Cerrar Sesión"></i>
    </button>
  )
}

export default ButtonLogout
