import fetchWithToken from '../utils/fetchWithToken'

const GetLastTarifasOperadores = async () => {
  try {
    const response = await fetchWithToken('/api/tarifaoperador/last_tarifas')

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching last tarifas operadores:', error)

    return { success: false, error: error.message }
  }
}

export default GetLastTarifasOperadores
