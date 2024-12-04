import './Title.css'

const Title = ({ text, className = '' }) => {
  return <h2 className={`title ${className && className}`}>{text}</h2>
}

export default Title
