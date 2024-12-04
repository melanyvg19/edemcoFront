import fetchWithToken from '../utils/fetchWithToken'

const GetRemitters = async (idPlanta) => {
  try {
    const response = await fetchWithToken(
      `/api/email/find?idPlanta=${idPlanta}`
    )

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error(`Error fetching remitter by id: ${idPlanta}:`, error)

    return { success: false, error: error.message }
  }
}

export default GetRemitters
