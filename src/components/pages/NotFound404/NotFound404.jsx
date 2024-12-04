import { Link, useRouteError } from 'react-router-dom'
import './NotFound404.css'
import { useEffect } from 'react'

const NotFound404 = () => {
  const error = useRouteError()

  useEffect(() => {
    document.title = 'Edemco - Página no encontrada'
  }, [])

  return (
    <section className="error-page" id="error-page">
      <h1>Oops!</h1>
      <p>Error, la página a la que intentas acceder no existe.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/principal">Volver al Inicio</Link>
    </section>
  )
}

export default NotFound404
