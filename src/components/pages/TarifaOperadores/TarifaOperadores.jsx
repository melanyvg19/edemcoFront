import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../atoms/Button/Button'
import Container from '../../layouts/Container/Container'
import GetLastTarifasOperadores from '../../../services/GetLastTarifasOperadores.service'
import GetOperadores from '../../../services/GetOperadores.service'
import Operadores from '../../molecules/Operadores/Operadores'
import PostTarifaOperadores from '../../../services/PostTarifaOperadores.service'
import './TarifaOperadores.css'

const TarifaOperadores = ({ setOpenStep }) => {
  const [tarifas, setTarifas] = useState({})
  const [operadores, setOperadores] = useState([])
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchOperadores = async () => {
      try {
        const result = await GetOperadores()
        const lastTarifasResult = await GetLastTarifasOperadores()

        if (result.success && lastTarifasResult.success) {
          const lastTarifas = lastTarifasResult.data

          const operadoresObject = result.data.reduce((acc, operador) => {
            acc[operador.nombreOperador] = ''
            return acc
          }, {})

          const lastTarifasObject = result.data.map((operador) => {
            const tarifa = lastTarifas.find(
              (tarifa) => tarifa.idOperador === operador.idOperador
            )
            return {
              ...operador,
              actualRate: tarifa ? tarifa.tarifaOperador : null,
              mes: tarifa ? tarifa.mes : ''
            }
          })

          setTarifas(operadoresObject)
          setOperadores(lastTarifasObject)
        } else {
          console.error(
            'Failed to fetch data:',
            result.error || lastTarifasResult.error
          )
        }
      } catch (error) {
        console.error('An error occurred:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOperadores()
  }, [])

  const actualizarTarifas = async (e) => {
    e.preventDefault()

    const newErrors = {}
    Object.entries(tarifas).forEach(([key, value]) => {
      if (value === '') {
        newErrors[key] = `La tarifa de ${key} no puede estar vacía.`
      }
    })
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    const tarifasOperadores = operadores.map(
      ({ idOperador, nombreOperador }) => ({
        tarifaOperador: parseFloat(tarifas[nombreOperador]),
        idOperador
      })
    )

    setButtonLoading(true)

    const result = await PostTarifaOperadores(tarifasOperadores)

    result.success
      ? toast.success('Tarifas enviadas correctamente.')
      : toast.error('Hubo un error al actualizar las tarifas.')

    setOperadores(
      operadores.map((operador) => ({
        ...operador,
        actualRate: Number(tarifas[operador.nombreOperador]),
        mes: operador.mes || ''
      }))
    )
    setTarifas(
      operadores.reduce((acc, operador) => {
        acc[operador.nombreOperador] = ''
        return acc
      }, {})
    )
    setButtonLoading(false)
    setOpenStep(2)
  }

  const handleChange = (nombreOperador, value) => {
    if (value.length > 10) return

    setTarifas({ ...tarifas, [nombreOperador]: value })

    if (value !== '') {
      const newErrors = { ...errors }
      delete newErrors[nombreOperador]
      setErrors(newErrors)
    }
  }

  return (
    <Container className="container--flex">
      <form onSubmit={actualizarTarifas} className="form-operadores">
        {loading && <p className="operadores__loading">Cargando...</p>}

        {operadores.length === 0 && !loading && (
          <p className="operadores__loading">No hay operadores.</p>
        )}

        <div className="operadores">
          {operadores.map(
            ({ actualRate, idOperador, nombreOperador, imgLogo, mes }) => (
              <Operadores
                actualRate={actualRate}
                errorMessage={errors[nombreOperador]}
                hasError={!!errors[nombreOperador]}
                imgLogo={imgLogo}
                inputValue={tarifas[nombreOperador]}
                key={idOperador}
                month={mes}
                nombreOperador={nombreOperador}
                onChange={(e) => handleChange(nombreOperador, e.target.value)}
              />
            )
          )}
        </div>

        <Button
          className="boton--margin"
          disabled={buttonLoading || loading}
          isLoading={buttonLoading}
          text={buttonLoading ? 'Actualizando' : 'Actualizar'}
        />
      </form>
    </Container>
  )
}

export default TarifaOperadores
