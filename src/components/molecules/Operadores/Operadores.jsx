import { getMonthName } from '../../../utils/Historicos.util'
import Input from '../../atoms/Input/Input'
import Title from '../../atoms/Title/Title'
import './Operadores.css'

const Operadores = ({
  actualRate,
  errorMessage,
  hasError,
  imgLogo,
  inputValue,
  month,
  nombreOperador,
  onChange
}) => {
  const formatNumber = (number) => {
    const parts = number.toFixed(2).split('.')
    const integerPart = parts[0]
    const decimalPart = parts[1]

    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    )

    return formattedIntegerPart + ',' + decimalPart
  }

  return (
    <article className="operador">
      <Title text={nombreOperador} />

      <img
        alt={`Logo de ${nombreOperador}`}
        className="operador__image"
        height={128}
        src={imgLogo}
        width={128}
      />

      <p className="tarifa">
        {actualRate ? (
          <>
            Tarifa {month ? `de ${getMonthName(month)}:` : ''}{' '}
            <b className="actual-rate">${formatNumber(actualRate)}</b>
          </>
        ) : (
          'No hay tarifa anterior'
        )}
      </p>

      <Input
        className={hasError ? 'input--error' : ''}
        errorMessage={errorMessage}
        hasError={hasError}
        id="tarifa"
        maxLength={10}
        name="tarifa"
        onChange={onChange}
        placeholder="Ingrese la tarifa"
        type="number"
        value={inputValue}
      />
    </article>
  )
}

export default Operadores
