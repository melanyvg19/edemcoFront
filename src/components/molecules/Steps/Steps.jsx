import './Steps.css'

const Steps = ({ actualStep = 1, steps }) => {
  return (
    <ul className="steps">
      {steps.map((step, idx) => {
        const stepClass = idx + 1 <= actualStep ? 'step active' : 'step'
        const hasBorder = idx + 1 >= steps.length - 1

        return (
          <li
            key={step}
            className={`${stepClass} ${hasBorder ? 'has-border' : ''}`}
          >
            <span className="step__number">{idx + 1}</span>

            <span className="step__text">{step}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default Steps
