import Cookies from 'js-cookie'

const PostNewAccessToken = async () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const JAVA_PORT = import.meta.env.VITE_JAVA_PORT

  const token = Cookies.get('accessToken')
  const refreshToken = Cookies.get('refreshToken')

  try {
    const response = await fetch(`${BASE_URL}${JAVA_PORT}/api/refreshToken`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ accessToken: token, refreshToken })
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error refreshing token:', error)

    return { success: false, error: error.message }
  }
}

export default PostNewAccessToken
