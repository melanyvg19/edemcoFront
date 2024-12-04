const PostLoginUser = async (user) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const JAVA_PORT = import.meta.env.VITE_JAVA_PORT

  try {
    const response = await fetch(`${BASE_URL}${JAVA_PORT}/api/login`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(user)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return { success: true, data: await response.json() }
  } catch (error) {
    console.error('Error login user:', error)

    return { success: false, error: error.message }
  }
}

export default PostLoginUser
