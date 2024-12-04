import './Select.css'

const Select = ({
  children,
  className = '',
  defaultOption,
  errorMessage,
  hasError,
  id,
  name,
  onChange,
  placeholder,
  value
}) => {
  return (
    <div className={`select-position ${className && className}`}>
      <select
        className={`select ${className && className}`}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      >
        <option disabled className="select--hide" value="0">
          {defaultOption}
        </option>
        {children}
      </select>

      <label className="select__label" htmlFor={id}>
        {placeholder}
      </label>

      {hasError && <p className="error">{errorMessage}</p>}
    </div>
  )
}

export default Select
