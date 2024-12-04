import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Anchord from '../../atoms/Anchord/Anchord'
import Button from '../../atoms/Button/Button'
import Container from '../../layouts/Container/Container'
import Input from '../../atoms/Input/Input'
import PostLoginUser from '../../../services/PostLoginUser'
import Title from '../../atoms/Title/Title'
import './Login.css'

const Login = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    usernameHasError: false,
    passwordHasError: false
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Edemco - Inicio de Sesión'
  }, [])

  const isFormValid = () => {
    const { username, password } = formValues

    return username.length > 0 && password.length > 0
  }

  const login = async (e) => {
    e.preventDefault()

    if (!isFormValid()) {
      return setFormValues({
        ...formValues,
        usernameHasError: formValues.username.length === 0,
        passwordHasError: formValues.password.length === 0
      })
    }

    setLoading(true)

    const result = await PostLoginUser({
      username: formValues.username,
      password: formValues.password
    })

    const UNAUTHORIZED_STATUS_CODE = 401

    if (result.data?.statusCode === UNAUTHORIZED_STATUS_CODE) {
      toast.error(result.data?.message)
      return setLoading(false)
    }

    if (result.success) {
      const { accessToken, refreshToken } = result.data

      Cookies.set('accessToken', accessToken)
      Cookies.set('refreshToken', refreshToken)
      navigate('/principal')
    } else {
      toast.error('Ocurrió un error inesperado, intenta nuevamente')
    }

    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValues({
      ...formValues,
      [name]: value,
      [`${name}HasError`]: value.length === 0
    })
  }

  return (
    <section className="login">
      <Container className="login--card container--flex container--max-width">
        <header className="titulo-login">
          <img
            alt="Logo Edemco buena energía"
            height={140}
            src="/Logo-removebg-preview.png"
            width={300}
          />

          <Title text="Inicio de sesión" className="title--medium" />
        </header>

        <form className="sesion" onSubmit={login}>
          <div className="login-form">
            <div className="input-group">
              <label htmlFor="username">
                <i className="fa-regular fa-user"></i>
              </label>

              <Input
                className={`${formValues.usernameHasError && 'input--error'}`}
                errorMessage="El usuario es obligatorio"
                hasError={formValues.usernameHasError}
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Usuario"
                type="text"
                value={formValues.username}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">
                <i className="fa-solid fa-key"></i>
              </label>

              <Input
                className={`${formValues.passwordHasError && 'input--error'}`}
                errorMessage="La contraseña es obligatoria"
                hasError={formValues.passwordHasError}
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Contraseña"
                type="password"
                value={formValues.password}
              />
            </div>
          </div>

          <Button
            className="login--big-button boton--margin"
            disabled={loading}
            isLoading={loading}
            text={loading ? 'Iniciando sesión' : 'Iniciar Sesión'}
          />
        </form>

        <div className="call-to-actions">
          <p>¿No tienes cuenta?</p>

          <Anchord
            className="boton--terciario"
            href="register"
            text="Regístrate ahora"
          />
        </div>
      </Container>
    </section>
  )
}

export default Login
