import { Link } from 'react-router-dom'
import './Anchord.css'

const Anchord = ({ text, href, className = '' }) => {
  return (
    <Link className={`boton boton--margin ${className && className}`} to={href}>
      {text}
    </Link>
  )
}

export default Anchord
