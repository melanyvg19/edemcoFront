import { Outlet, useLocation } from 'react-router-dom'
import ButtonBack from './components/atoms/ButtonBack/ButtonBack'
import Navbar from './components/organisms/Navbar/Navbar'
import './Layout.css'

function Layout() {
  const location = useLocation()
  const routesToHideButtonBack = ['/principal']

  return (
    <main>
      <Navbar />

      <div className="main-layout">
        <Outlet />
      </div>

      {!routesToHideButtonBack.includes(location.pathname) && <ButtonBack />}
    </main>
  )
}

export default Layout
