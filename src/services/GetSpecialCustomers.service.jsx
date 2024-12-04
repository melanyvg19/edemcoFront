import fetchWithToken from '../utils/fetchWithToken'

const GetSpecialCustomers = async () => {
  try {
    const response = await fetchWithToken('/api/cliente/list_especiales')

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching special customers:', error)

    return { success: false, error: error.message }
  }
}

export default GetSpecialCustomers
