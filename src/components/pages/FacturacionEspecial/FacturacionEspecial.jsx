import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../atoms/Button/Button'
import Container from '../../layouts/Container/Container'
import GetSpecialCustomers from '../../../services/GetSpecialCustomers.service'
import Input from '../../atoms/Input/Input'
import PostFacturacionEspecial from '../../../services/PostFacturacionEspecial.service'
import Select from '../../atoms/Select/Select'
import './FacturacionEspecial.css'

const FacturacionEspecial = ({ setOpenStep }) => {
  const initialFormValues = {
    cantidadkWh: '',
    excedente: '',
    costoAgregado: '',
    idPlanta: '505'
  }

  const initialFormErrors = {
    cantidadkWh: false,
    excedente: false,
    costoAgregado: false
  }

  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [specialCustomersList, setSpecialCustomersList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Edemco - Facturación Especial'

    const fetchSpecialCustomers = async () => {
      const result = await GetSpecialCustomers()

      if (result.success) {
        setSpecialCustomersList(result.data)
      } else {
        console.error('Failed to fetch customers:', result.error)
      }
    }

    fetchSpecialCustomers()
  }, [])

  const isFormValid = () => {
    return formValues.excedente !== '' && formValues.costoAgregado !== ''
  }

  const submitForm = async (e) => {
    e.preventDefault()

    if (!isFormValid()) {
      return setFormErrors({
        ...formErrors,
        cantidadkWh: formValues.cantidadkWh === '',
        excedente: formValues.excedente === '',
        costoAgregado: formValues.costoAgregado === ''
      })
    }

    setLoading(true)

    const result = await PostFacturacionEspecial(formValues)

    console.log(result)

    if (result?.data?.statusCode === 400) {
      setLoading(false)
      return toast.error(result?.data?.message)
    }

    if (!result.success) {
      setLoading(false)
      return toast.error('Ocurrió un error al enviar los datos')
    }

    setLoading(false)
    setFormValues(initialFormValues)
    toast.success('Datos enviados con éxito')
    setOpenStep(3)
  }

  const handleChange = (e) => {
    const { target } = e
    const { name, value } = target

    setFormErrors({
      ...formErrors,
      [name]: value === ''
    })

    const newValues = {
      ...formValues,
      [name]: value
    }

    setFormValues(newValues)
  }

  return (
    <>
      <Container className="container--flex">
        <form onSubmit={submitForm} className="facturacion-especial__inputs">
          <Input
            className={`${formErrors.cantidadkWh && 'input--error'}`}
            errorMessage="La cantidad de KWH es obligatoria"
            hasError={formErrors.cantidadkWh}
            id="cantidadkWh"
            name="cantidadkWh"
            onChange={handleChange}
            placeholder="Cantidad Exportación (kWh)"
            type="number"
            value={formValues.cantidadkWh}
          />

          <Input
            className={`${formErrors.excedente && 'input--error'}`}
            errorMessage="El excedente es obligatorio"
            hasError={formErrors.excedente}
            id="excedente"
            name="excedente"
            onChange={handleChange}
            placeholder="Excedente ($)"
            type="number"
            value={formValues.excedente}
          />

          <Input
            className={`${formErrors.costoAgregado && 'input--error'}`}
            errorMessage="El costo agregado es obligatorio"
            hasError={formErrors.costoAgregado}
            id="costoAgregado"
            name="costoAgregado"
            onChange={handleChange}
            placeholder="Costo agregado ($)"
            type="number"
            value={formValues.costoAgregado}
          />

          <Select
            defaultOption="Seleccione una planta"
            id="idPlanta"
            name="idPlanta"
            onChange={handleChange}
            placeholder="Planta"
            value={formValues.idPlanta}
          >
            {specialCustomersList.map(({ idPlanta, nombrePlanta }) => (
              <option key={idPlanta} value={idPlanta}>
                {nombrePlanta}
              </option>
            ))}
          </Select>

          <Button
            className="boton--margin"
            disabled={loading}
            isLoading={loading}
            text={loading ? 'Actualizando' : 'Actualizar'}
          />
        </form>
      </Container>
    </>
  )
}

export default FacturacionEspecial
