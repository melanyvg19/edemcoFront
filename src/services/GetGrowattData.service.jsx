import Cookies from 'js-cookie'

const GetGrowattData = async () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const token = Cookies.get('accessToken')

  try {
    const response = await fetch(`${BASE_URL}8094/api/growatt`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return { success: true, data: await response.json() }
  } catch (error) {
    console.error('Error sending data to growatt:', error)

    return { success: false, error: error.message }
  }
}

export default GetGrowattData
