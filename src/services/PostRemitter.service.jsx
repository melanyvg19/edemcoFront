import fetchWithToken from '../utils/fetchWithToken'

const PostRemitter = async (remitter) => {
  try {
    const response = await fetchWithToken('/api/email/create', {
      method: 'POST',

      body: JSON.stringify(remitter)
    })

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, idEmail: data }
  } catch (error) {
    console.error('Error creating remitter:', error)

    return { success: false, error: error.message }
  }
}

export default PostRemitter
