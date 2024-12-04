import { useEffect } from 'react'
import Title from '../../atoms/Title/Title'
import './Modal.css'

const Modal = ({ children, onClose, title }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keyup', handleKeyDown)

    return () => {
      document.removeEventListener('keyup', handleKeyDown)
    }
  }, [])

  return (
    <section className="modal__container">
      <article className="modal">
        <header className='modal__header'>
          {title && <Title text={title} />}

          <button onClick={onClose} className="modal__close-button">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </header>

        {children}
      </article>
    </section>
  )
}

export default Modal
