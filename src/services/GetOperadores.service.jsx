import fetchWithToken from '../utils/fetchWithToken'

const GetOperadores = async () => {
  try {
    const response = await fetchWithToken('/api/operador')

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching operadores:', error)

    return { success: false, error: error.message }
  }
}

export default GetOperadores
