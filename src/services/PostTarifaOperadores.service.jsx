import fetchWithToken from '../utils/fetchWithToken'

const PostTarifaOperadores = async (tarifaOperador) => {
  try {
    const response = await fetchWithToken('/api/tarifaoperador', {
      method: 'POST',

      body: JSON.stringify(tarifaOperador)
    })

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    return { success: true }
  } catch (error) {
    console.error('Error creating new tarifa operador:', error)

    return { success: false, error: error.message }
  }
}

export default PostTarifaOperadores
