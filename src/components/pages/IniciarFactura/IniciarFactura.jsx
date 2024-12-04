import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../atoms/Button/Button'
import Container from '../../layouts/Container/Container'
import GetCustomers from '../../../services/GetCustomers.service'
import GetGrowattData from '../../../services/GetGrowattData.service'
import Input from '../../atoms/Input/Input'
import PostExcelFile from '../../../services/PostExcelFile.service'
import PostGenerateCalculations from '../../../services/PostGenerateCalculations.service'
import PostSiesaIntegration from '../../../services/PostSiesaIntegration.service'
import Select from '../../atoms/Select/Select'
import './IniciarFactura.css'

const IniciarFactura = () => {
  const initialFormValues = {
    idPlanta: '0',
    archivo: '',
    plantaHasError: false
  }

  const [formValues, setFormValues] = useState(initialFormValues)
  const [customers, setCustomers] = useState([])
  const [customersList, setCustomersList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.title = 'Edemco - Iniciar Facturación'

    const fetchCustomers = async () => {
      const result = await GetCustomers()

      if (result.success) {
        setCustomersList(result.data)
      } else {
        console.error('Failed to fetch customers:', result.error)
      }
    }

    fetchCustomers()
  }, [])

  const isFormValid = () => {
    return !formValues.plantaHasError && customers.length > 0
  }

  const submitInvoice = (e) => {
    e.preventDefault()

    setFormValues({
      ...formValues,
      plantaHasError: customers.length === 0
    })

    if (!isFormValid()) return

    setIsLoading(true)

    const fileExists =
      formValues.archivo !== '' && formValues.archivo !== undefined

    if (fileExists) {
      uploadFile(formValues.archivo)
    } else {
      sendDataToGrowatt()
    }
  }

  const sendDataToGrowatt = async () => {
    const result = await GetGrowattData()

    if (result.success) {
      await generateCalculations(JSON.parse(result.data))
      await siesaIntegration()
    } else {
      console.error('Failed to get data from growatt:', result.error)

      setIsLoading(false)
    }
  }

  const uploadFile = async (excelFile) => {
    const result = await PostExcelFile(excelFile)

    if (result.success) {
      await generateCalculations(result.data)
      await siesaIntegration()
    } else {
      console.error('Failed to upload file:', result.error)
      toast.error(
        'El archivo no es válido, carga el excel con la generación de Growatt'
      )
      setIsLoading(false)
    }
  }

  const generateCalculations = async (calculations) => {
    const result = await PostGenerateCalculations(calculations)

    if (!result.success) {
      console.error('Failed to generate calculations:', result.error)

      setIsLoading(false)
      toast.error('Error al generar la facturación, intenta nuevamente')
    }
  }

  const siesaIntegration = async () => {
    const todayDate = new Date().toISOString().split('T')[0]

    const result = await PostSiesaIntegration(customers, todayDate)

    if (result.success) {
      toast.success('Facturas generadas con éxito!')
    } else {
      console.error('Failed to integrate on siesa:', result.error)
    }

    setIsLoading(false)
  }

  const addCustomer = (customer) => {
    if (customers.some(({ idPlanta }) => idPlanta === customer.idPlanta)) return

    setCustomers([...customers, customer])
    setFormValues((prevValues) => ({
      ...prevValues,
      plantaHasError: false
    }))
  }

  const removeCustomer = (planta) => {
    const updatedCustomers = customers.filter(
      ({ idPlanta }) => idPlanta !== planta
    )

    setCustomers(updatedCustomers)

    setFormValues((prevValues) => ({
      ...prevValues,
      plantaHasError: updatedCustomers.length === 0
    }))
  }

  const handleChange = (e) => {
    const { target } = e
    const { name, value, files, options } = target

    if (options && name === 'idPlanta') {
      const valueText = options[e.target.selectedIndex].text

      if (value === 'all') {
        const allCustomers = customersList.map(
          ({ idPlanta, nombrePlanta }) => ({
            idPlanta,
            nombrePlanta
          })
        )

        setFormValues((prevValues) => ({
          ...prevValues,
          plantaHasError: false
        }))

        return setCustomers(allCustomers)
      }

      addCustomer({ idPlanta: value, nombrePlanta: valueText })
    } else if (name === 'archivo') {
      return setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0]
      }))
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  return (
    <Container className="container--flex">
      <form className="facturacion__form" onSubmit={submitInvoice}>
        <div className="facturacion__filtros">
          <Select
            className={`${formValues.plantaHasError && 'select--error'}`}
            defaultOption="Seleccione una planta"
            errorMessage="Selecciona al menos una planta"
            hasError={formValues.plantaHasError}
            id="idPlanta"
            name="idPlanta"
            onChange={handleChange}
            placeholder="Planta"
            value={formValues.idPlanta}
          >
            {customers.length === 0 && (
              <option value="all">Todas las plantas</option>
            )}

            {customersList.map(({ idPlanta, nombrePlanta }) => (
              <option key={idPlanta} value={idPlanta}>
                {nombrePlanta}
              </option>
            ))}
          </Select>

          <Input
            accept=".xls, .xlsx"
            id="archivo"
            name="archivo"
            onChange={handleChange}
            placeholder="Archivo excel (opcional)"
            type="file"
          />
        </div>

        {customers.length > 0 && (
          <div className="facturacion__clientes-facturar">
            <p className="facturacion__subtitle facturacion__bold">
              Clientes a facturar:
            </p>

            <div className="facturacion__clientes">
              {customers.map(({ idPlanta, nombrePlanta }) => (
                <div key={idPlanta} className="facturacion__cliente">
                  <p>{nombrePlanta}</p>

                  <button
                    className="facturacion__close-button"
                    onClick={() => removeCustomer(idPlanta)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          disabled={isLoading}
          isLoading={isLoading}
          text={isLoading ? 'Cargando' : 'Iniciar Facturación'}
        />
      </form>
    </Container>
  )
}

export default IniciarFactura
