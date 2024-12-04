import Cookies from 'js-cookie'

const GetDataInvoices = async () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const token = Cookies.get('accessToken')

  try {
    const response = await fetch(`${BASE_URL}8092/api/facturas`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching invoices data:', error)

    return { success: false, error: error.message }
  }
}

export default GetDataInvoices
