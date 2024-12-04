import { createBrowserRouter } from 'react-router-dom'

import EnviarEmails from './components/pages/EnviarEmails/EnviarEmails.jsx'
import Facturacion from './components/pages/Facturacion/Facturacion.jsx'
import FacturacionEspecial from './components/pages/FacturacionEspecial/FacturacionEspecial.jsx'
import Historicos from './components/pages/Historicos/Historicos.jsx'
import Home from './components/pages/Home/Home.jsx'
import IniciarFactura from './components/pages/IniciarFactura/IniciarFactura.jsx'
import Layout from './Layout.jsx'
import Login from './components/pages/Login/Login.jsx'
import NotFound404 from './components/pages/NotFound404/NotFound404.jsx'
import Plantas from './components/pages/Plantas/Plantas.jsx'
import ProtectedRoute from './components/layouts/ProtectedRoute/ProtectedRoute.jsx'
import Register from './components/pages/Register/Register.jsx'
import TarifaOperadores from './components/pages/TarifaOperadores/TarifaOperadores.jsx'
import VisualizacionArchivos from './components/pages/VisualizacionArchivos/VisualizacionArchivos.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound404 />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <NotFound404 />
  },
  {
    path: '/principal',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Home />
          },
          {
            path: 'facturacion',
            element: <Facturacion />
          },
          {
            path: 'tarifa-operadores',
            element: <TarifaOperadores />
          },
          {
            path: 'facturacion-especial',
            element: <FacturacionEspecial />
          },
          {
            path: 'iniciar-factura',
            element: <IniciarFactura />
          },
          {
            path: 'plantas',
            element: <Plantas />
          },
          {
            path: 'enviar-emails',
            element: <EnviarEmails />
          },
          {
            path: 'historicos',
            element: <Historicos />
          },
          {
            path: 'visualizacion-archivos',
            element: <VisualizacionArchivos />
          }
        ]
      }
    ],
    errorElement: <NotFound404 />
  }
])
