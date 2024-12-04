import fetchWithToken from '../utils/fetchWithToken'

const GetRemitters = async () => {
  try {
    const response = await fetchWithToken('/api/email/all')

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching remitters:', error)

    return { success: false, error: error.message }
  }
}

export default GetRemitters
