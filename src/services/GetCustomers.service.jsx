import fetchWithToken from '../utils/fetchWithToken'

const GetCustomers = async () => {
  try {
    const response = await fetchWithToken('/api/planta/all')

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching customers:', error)

    return { success: false, error: error.message }
  }
}

export default GetCustomers
