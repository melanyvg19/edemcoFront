import { Link } from 'react-router-dom'
import './Navbar.css'
import ButtonLogout from '../../atoms/ButtonLogout/ButtonLogout'

const Navbar = () => {
  return (
    <nav className="titulo">
      <Link className='titulo__link' to="/principal">
        <img
          alt="logo-edemco"
          height={127}
          src="/Logo-removebg-preview.png"
          width={290}
        />
      </Link>

      <ButtonLogout />
    </nav>
  )
}

export default Navbar
