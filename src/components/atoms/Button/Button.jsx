import './Button.css'

const Button = ({
  className = '',
  disabled,
  id,
  isLoading,
  onClick,
  text,
  type
}) => {
  return (
    <button
      className={`boton ${className && className}`}
      disabled={disabled}
      id={id}
      onClick={onClick}
      type={type}
    >
      {text}

      {isLoading && <span className="loader"></span>}
    </button>
  )
}

export default Button
