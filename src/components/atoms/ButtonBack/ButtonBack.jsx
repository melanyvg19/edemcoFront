import { useNavigate } from 'react-router-dom'
import './ButtonBack.css'

const ButtonBack = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/principal')
  }

  return (
    <button onClick={goBack} className="btn-back">
      <i className="fa-solid fa-angle-left"></i>
    </button>
  )
}

export default ButtonBack
