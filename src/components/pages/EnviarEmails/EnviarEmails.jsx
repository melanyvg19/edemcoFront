import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../atoms/Button/Button'
import Dropdown from '../../molecules/Dropdown/Dropdown'
import GetDataInvoices from '../../../services/GetDataInvoices.service'
import Modal from '../../layouts/Modal/Modal'
import PostTemplate from '../../../services/PostTemplate.service'
import Table from '../../organisms/Table/Table'
import Title from '../../atoms/Title/Title'
import './EnviarEmails.css'

const EnviarEmails = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({})
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    document.title = 'Edemco - Enviar Emails'
    fetchFacturas()
  }, [])

  const fetchFacturas = async () => {
    const result = await GetDataInvoices()

    if (result.success) {
      const formattedData = result.data.map((row) => ({
        ...row,
        cantidad: `${row.cantidad} kWh`
      }))

      setInvoices(result.data)
      setRows(formattedData)
    } else {
      console.error('Failed to fetch invoices:', result.error)
    }

    setPageLoading(false)
  }

  const columns = [
    'Código Planta',
    'Nombre Planta',
    'Fecha Inicio',
    'Fecha Fin',
    'Días consumo',
    'Consumo Actual',
    'Consumo Acumulado',
    'Concepto Facturado',
    'Generacion Mensual',
    'Costo unidad',
    'Valor Total',
    'Fecha de Pago',
    'Factura Mes',
    'Factura Nro',
    'Contrato Nro',
    'Ahorro Actual',
    'Ahorro Acumulado',
    'Periodo Actual',
    'Periodo Acumulado',
    'CUFE',
    'Fecha CUFE'
  ]

  const columnKeyMap = {
    'Ahorro Actual': 'ahorro_actual',
    'Ahorro Acumulado': 'ahorro_acumulado',
    'Código Planta': 'cod_planta',
    'Concepto Facturado': 'concepto_facturado',
    'Consumo Actual': 'consumo_actual',
    'Consumo Acumulado': 'consumo_acumulado',
    'Contrato Nro': 'contrato_no',
    'Costo unidad': 'costo_unidad',
    CUFE: 'cufe',
    'Días consumo': 'dias_consumo',
    'Factura Mes': 'factura_mes',
    'Factura Nro': 'numero_factura',
    'Fecha CUFE': 'fecha_cufe',
    'Fecha de Pago': 'fecha_pago',
    'Fecha Fin': 'fecha_fin',
    'Fecha Inicio': 'fecha_inicio',
    'Generacion Mensual': 'cantidad',
    'Nombre Planta': 'nombre_planta',
    'Periodo Actual': 'periodo_actual',
    'Periodo Acumulado': 'periodo_acumulado',
    'Valor Total': 'valor_total'
  }

  const filteredColumns = columns.filter(
    (column) =>
      ![
        'Consumo Actual',
        'Consumo Acumulado',
        'Concepto Facturado',
        'Costo unidad',
        'Factura Mes',
        'Ahorro Actual',
        'Ahorro Acumulado',
        'Periodo Actual',
        'Periodo Acumulado',
        'CUFE',
        'Fecha CUFE'
      ].includes(column)
  )

  const generateTemplate = async () => {
    if (rows.length === 0) return

    setLoading(true)

    const response = await PostTemplate(invoices)

    if (!response.success) {
      setLoading(false)
      return toast.error('Ocurrió un error al generar las plantillas')
    }

    setLoading(false)
    toast.success('Plantillas generadas correctamente')
  }

  const editRow = (rowData) => {
    setFormData(rowData)

    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <Title text="Editar Remitentes y Enviar Emails" />

      {!pageLoading && (
        <Table
          className="tabla--max-width"
          columnKeyMap={columnKeyMap}
          columns={filteredColumns}
          onEditRow={editRow}
          rows={rows}
          rowsPerPage={20}
          showPagination={false}
        />
      )}

      {pageLoading && (
        <p className="enviar-email__loading">
          Cargando
          <i className="loader"></i>
        </p>
      )}

      {!pageLoading && rows.length > 0 && (
        <>
          <p className="editar-diseno__tooltip">
            <i className="fa-solid fa-circle-info"></i>
            Haz click en cada fila para editar los remitentes
          </p>
          <Button
            className="boton--margin boton--margin-block boton--relative"
            disabled={loading}
            isLoading={loading}
            onClick={generateTemplate}
            text={loading ? 'Generando' : 'Generar plantillas y enviar correos'}
          />
        </>
      )}

      {!pageLoading && rows.length === 0 && (
        <h3 className="editar-diseno__no-invoices">
          No hay facturas para mostrar
        </h3>
      )}

      {showModal && (
        <Modal
          title={`Remitentes de ${formData.nombre_planta}`}
          onClose={handleClose}
        >
          <Dropdown idPlanta={formData.cod_planta} />
        </Modal>
      )}
    </>
  )
}

export default EnviarEmails
