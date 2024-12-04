import fetchWithToken from '../utils/fetchWithToken'

const PostSiesaIntegration = async (customers, fechaFactura) => {
  try {
    const response = await fetchWithToken(
      `/api/integracion_siesa/enviar_factura_siesa?date=${fechaFactura}`,
      {
        method: 'POST',

        body: JSON.stringify(customers)
      }
    )

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error integrating on siesa:', error)

    return { success: false, error: error.message }
  }
}

export default PostSiesaIntegration
