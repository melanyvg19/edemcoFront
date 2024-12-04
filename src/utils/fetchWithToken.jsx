import Cookies from 'js-cookie'
import PostNewAccessToken from '../services/PostNewAccessToken.service'

const fetchWithToken = async (url, options = {}, isPython = false) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const JAVA_PORT = import.meta.env.VITE_JAVA_PORT
  const PYTHON_PORT = 8090
  const UNAUTHORIZED_STATUS_CODE = 401
  const FORBIDDEN_STATUS_CODE = 403

  const token = Cookies.get('accessToken')

  try {
    const port = isPython ? PYTHON_PORT : JAVA_PORT
    const response = await fetch(`${BASE_URL}${port}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (
      response.ok &&
      data.statusCode !== UNAUTHORIZED_STATUS_CODE &&
      data.statusCode !== FORBIDDEN_STATUS_CODE
    ) {
      return { success: true, data }
    }

    if (data.statusCode === UNAUTHORIZED_STATUS_CODE) {
      const refreshResult = await PostNewAccessToken()

      if (
        refreshResult.success &&
        refreshResult.data.statusCode !== FORBIDDEN_STATUS_CODE
      ) {
        const newAccessToken = refreshResult.data.accessToken

        if (newAccessToken) Cookies.set('accessToken', newAccessToken)

        const retryResponse = await fetch(`${BASE_URL}${JAVA_PORT}${url}`, {
          ...options,
          headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAccessToken}`
          }
        })

        if (!retryResponse.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await retryResponse.json()

        return { success: true, data }
      } else if (refreshResult.data.statusCode === FORBIDDEN_STATUS_CODE) {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')

        window.location.href = '/'
        return { success: false, error: data.message }
      } else {
        throw new Error('Could not refresh token')
      }
    }

    throw new Error('Network response was not ok')
  } catch (error) {
    console.error('Error in fetchWithToken:', error)
    return { success: false, error: error.message }
  }
}

export default fetchWithToken
