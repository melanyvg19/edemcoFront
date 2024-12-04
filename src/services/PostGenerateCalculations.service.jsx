import fetchWithToken from '../utils/fetchWithToken'

const PostGenerateCalculations = async (calculations) => {
  try {
    const response = await fetchWithToken('/api/generacion/calculos', {
      method: 'POST',

      body: JSON.stringify(calculations)
    })

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error generating calculations:', error)

    return { success: false, error: error.message }
  }
}

export default PostGenerateCalculations
