import './Chip.css'

const Chip = ({ text, onRemove, showRemove = true, id }) => {
  return (
    <span title={text} className="chip" id={id}>
      <span className="chip__text">{text}</span>

      {showRemove && (
        <button
          className="chip__button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </span>
  )
}

export default Chip
