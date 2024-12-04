import fetchWithToken from '../utils/fetchWithToken'

const DeleteRemitter = async (remitterId) => {
  try {
    const response = await fetchWithToken(
      `/api/email/delete?idEmail=${remitterId}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting remitter:', error)

    return { success: false, error: error.message }
  }
}

export default DeleteRemitter
