import fetchWithToken from '../utils/fetchWithToken'

const PostFacturacionEspecial = async (facturacionEspecial) => {
  try {
    const response = await fetchWithToken('/api/facturacion_especial/create', {
      method: 'POST',

      body: JSON.stringify(facturacionEspecial)
    })

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    return { success: true, data: response.data }
  } catch (error) {
    console.error('Error sending special invoices:', error)

    return { success: false, error: error.message }
  }
}

export default PostFacturacionEspecial
