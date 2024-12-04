import { useEffect } from 'react'
import './Input.css'

const Input = ({
  accept,
  checked = '',
  className = '',
  errorMessage,
  hasError = false,
  id,
  name,
  onChange,
  placeholder,
  type,
  value
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (type === 'number' && event.key === 'e') event.preventDefault()
    }

    const input = document.querySelector(`#${id}`)

    input.addEventListener('keydown', handleKeyDown)

    return () => {
      input.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div
      className={`input-position ${checked ? 'checked' : ''} ${className && className}`}
    >
      <input
        accept={accept}
        checked={checked}
        className={`input ${className && className}`}
        id={id}
        name={name}
        onChange={onChange}
        placeholder=""
        type={type}
        value={value}
      />

      <label className="input__label" htmlFor={id}>
        {placeholder}
      </label>

      {hasError && <p className="error">{errorMessage}</p>}
    </div>
  )
}

export default Input
