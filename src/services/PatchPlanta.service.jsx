import fetchWithToken from '../utils/fetchWithToken'

const PatchPlanta = async (planta) => {
  try {
    const response = await fetchWithToken('/api/planta/updatePlanta', {
      method: 'PATCH',

      body: JSON.stringify(planta)
    })

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error sending new planta:', error)

    return { success: false, error: error.message }
  }
}

export default PatchPlanta
