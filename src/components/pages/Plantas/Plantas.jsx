import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../atoms/Button/Button'
import Container from '../../layouts/Container/Container'
import GetCustomers from '../../../services/GetCustomers.service'
import Input from '../../atoms/Input/Input'
import PatchPlanta from '../../../services/PatchPlanta.service'
import Title from '../../atoms/Title/Title'
import './Plantas.css'

const Plantas = () => {
  const [formValues, setFormValues] = useState({})
  const [initialValues, setInitialValues] = useState({})
  const [plantas, setPlantas] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await GetCustomers()

      if (result.success) {
        const orderedPlantas = result.data.sort(
          (a, b) => a.idPlanta - b.idPlanta
        )
        setPlantas(orderedPlantas)

        const initialData = result.data.reduce((acc, planta) => {
          acc[planta.idPlanta] = {
            asunto: planta.asunto || '',
            urlImg: planta.urlImg || '',
            porcentajeAumento: 0
          }
          return acc
        }, {})

        setFormValues(initialData)
        setInitialValues(initialData)
      } else {
        console.error('Failed to fetch plantas:', result.error)
      }

      setPageLoading(false)
    }

    fetchCustomers()
  }, [])

  const updatePlanta = (e) => {
    e.preventDefault()

    const filteredFormValues = Object.entries(formValues)
      .filter(([id, values]) => {
        const initial = initialValues[id]
        return (
          values.asunto !== initial.asunto ||
          values.urlImg !== initial.urlImg ||
          values.porcentajeAumento !== initial.porcentajeAumento
        )
      })
      .map(([id, values]) => {
        const result = { idPlanta: id }
        if (values.asunto !== initialValues[id].asunto)
          result.asunto = values.asunto
        if (values.urlImg !== initialValues[id].urlImg)
          result.urlImg = values.urlImg
        if (values.porcentajeAumento !== initialValues[id].porcentajeAumento)
          result.porcentajeAumento = values.porcentajeAumento / 100

        return result
      })

    if (filteredFormValues.length === 0) return

    patchPlanta(filteredFormValues)
  }

  const patchPlanta = async (newValues) => {
    setIsLoading(true)

    try {
      const result = await PatchPlanta(newValues)

      if (result.success) {
        const plantaMap = new Map(
          plantas.map((planta) => [planta.idPlanta, planta])
        )

        result.data.forEach((planta) => {
          const existingPlanta = plantaMap.get(planta.idPlanta)
          if (existingPlanta) {
            plantaMap.set(planta.idPlanta, { ...existingPlanta, ...planta })
          }
        })

        const newPlantas = plantas.map(
          (planta) => plantaMap.get(planta.idPlanta) || planta
        )

        setPlantas(newPlantas)
        setInitialValues(formValues)
        toast.success('Plantas modificadas correctamente')
      } else {
        console.error('Failed to update plantas:', result.error)
      }
    } catch (error) {
      console.error('An error occurred while updating plantas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (idPlanta, e) => {
    const { name, value } = e.target

    setFormValues({
      ...formValues,
      [idPlanta]: {
        ...formValues[idPlanta],
        [name]: value
      }
    })
  }

  return (
    <Container className="container--flex">
      <Title text="Modificar Plantas" />

      {pageLoading && (
        <p className="plantas__loading">
          Cargando plantas
          <i className="loader"></i>
        </p>
      )}

      {!pageLoading && plantas.length === 0 && (
        <p className="plantas__no-data">No hay plantas</p>
      )}

      <form onSubmit={updatePlanta} className="plantas__form">
        {plantas.map(({ idPlanta, nombrePlanta, valorUnidad }) => {
          return (
            <article key={idPlanta} className="planta__form">
              <Title
                className="title--medium title--capitalize title--align-left"
                text={`${idPlanta} - ${nombrePlanta.toLowerCase()}`}
              />

              <Title
                className="title--small title--align-left"
                text={`Valor Unidad: $${valorUnidad.toFixed(2)}`}
              />

              <div className="planta__inputs">
                <Input
                  id={`asunto-${idPlanta}`}
                  name="asunto"
                  onChange={(e) => handleChange(idPlanta, e)}
                  placeholder="Asunto"
                  type="text"
                  value={formValues[idPlanta]?.asunto || ''}
                />

                <Input
                  id={`urlImg-${idPlanta}`}
                  name="urlImg"
                  onChange={(e) => handleChange(idPlanta, e)}
                  placeholder="Url imagen"
                  type="text"
                  value={formValues[idPlanta]?.urlImg || ''}
                />

                <Input
                  id={`porcentajeAumento-${idPlanta}`}
                  name="porcentajeAumento"
                  onChange={(e) => handleChange(idPlanta, e)}
                  placeholder="Porcentaje de aumento"
                  type="number"
                  value={formValues[idPlanta]?.porcentajeAumento || ''}
                />
              </div>
            </article>
          )
        })}

        {!pageLoading && plantas.length !== 0 && (
          <Button
            text={isLoading ? 'Modificando' : 'Modificar plantas'}
            isLoading={isLoading}
            disabled={isLoading}
          />
        )}
      </form>
    </Container>
  )
}

export default Plantas
