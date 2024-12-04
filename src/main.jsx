import { router } from './routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      pauseOnFocusLoss={false}
    />
  </StrictMode>
)
