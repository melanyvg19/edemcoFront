import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Anchord from '../../atoms/Anchord/Anchord'
import Button from '../../atoms/Button/Button'
import Container from '../../layouts/Container/Container'
import Input from '../../atoms/Input/Input'
import PostRegisterUser from '../../../services/PostRegisterUser.service'
import Title from '../../atoms/Title/Title'
import './Register.css'

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    usernameHasError: false,
    passwordHasError: false,
    confirmPasswordHasError: false,
    passwordsMatchError: false
  })
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Edemco - Registro de usuarios'
  }, [])

  const isFormValid = () => {
    const { username, password, confirmPassword } = formValues

    return (
      username.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    )
  }

  const register = async (e) => {
    e.preventDefault()

    if (!isFormValid()) {
      return setFormValues({
        ...formValues,
        usernameHasError: formValues.username.length === 0,
        passwordHasError: formValues.password.length === 0,
        confirmPasswordHasError: formValues.confirmPassword.length === 0,
        passwordsMatchError: formValues.password !== formValues.confirmPassword
      })
    }

    setLoading(true)

    const result = await PostRegisterUser({
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
      [`${name}HasError`]: value.length === 0,
      passwordsMatchError:
        name === 'confirmPassword' && value !== formValues.password
    })
  }

  const toggleShowPassword = () => {
    setShowPasswords(!showPasswords)
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

          <Title text="Registro de usuarios" className="title--medium" />

          <p className="login__info title--margin">
            Las credenciales deben ser las mismas que las de Outlook para que el
            aplicativo funcione correctamente
          </p>
        </header>

        <form className="sesion" onSubmit={register}>
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
                type={showPasswords ? 'text' : 'password'}
                value={formValues.password}
              />

              <button
                className="hide-show-password"
                onClick={toggleShowPassword}
                type="button"
              >
                <i
                  className={
                    showPasswords ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
                  }
                ></i>
              </button>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">
                <i className="fa-solid fa-key"></i>
              </label>

              <Input
                className={`${formValues.confirmPasswordHasError && 'input--error'}`}
                errorMessage={
                  formValues.confirmPasswordHasError
                    ? 'La confirmación de la contraseña es obligatoria'
                    : formValues.passwordsMatchError
                      ? 'Las contraseñas no coinciden'
                      : ''
                }
                hasError={
                  formValues.confirmPasswordHasError ||
                  formValues.passwordsMatchError
                }
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirmar contraseña"
                type={showPasswords ? 'text' : 'password'}
                value={formValues.confirmPassword}
              />

              <button
                className="hide-show-password"
                onClick={toggleShowPassword}
                type="button"
              >
                <i
                  className={
                    showPasswords ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
                  }
                ></i>
              </button>
            </div>
          </div>

          <Button
            className="login--big-button boton--margin"
            disabled={loading}
            isLoading={loading}
            text={loading ? 'Registrando' : 'Registrarme'}
          />
        </form>

        <div className="call-to-actions">
          <p>¿Ya tienes una cuenta?</p>

          <Anchord
            className="boton--terciario"
            href="/"
            text="Inicia sesión aquí"
          />
        </div>
      </Container>
    </section>
  )
}

export default Register
