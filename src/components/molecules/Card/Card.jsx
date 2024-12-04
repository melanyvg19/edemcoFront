import Anchord from '../../atoms/Anchord/Anchord'
import Title from '../../atoms/Title/Title'
import './Card.css'

const Card = ({ title, icon, href, linkText, children }) => {
  return (
    <article className="card">
      <div className="card-header">
        <Title className="title--medium" text={title} />
      </div>

      <div className="card-body">
        {children}
        <i className={icon}></i>
      </div>

      {linkText && (
        <div className="card-footer">
          <Anchord href={href} text={linkText} />
        </div>
      )}
    </article>
  )
}

export default Card
