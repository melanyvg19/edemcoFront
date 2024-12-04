// import { Outlet } from 'react-router-dom'
import './Container.css'

const Container = ({ children, className = '' }) => {
  return (
    <section className={`contenedor ${className && className}`}>
      {children}
    </section>
  )
}

export default Container
