import Cookies from 'js-cookie'

const PostExcelFile = async (excelFile) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const token = Cookies.get('accessToken')

  try {
    const formData = new FormData()
    formData.append('file', excelFile)

    const response = await fetch(`${BASE_URL}8093/api/upload_excel`, {
      headers: {
        Authorization: `Bearer ${token}`
      },

      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error uploading file:', error)

    return { success: false, error: error.message }
  }
}

export default PostExcelFile