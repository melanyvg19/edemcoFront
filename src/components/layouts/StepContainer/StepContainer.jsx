import Title from '../../atoms/Title/Title'
import './StepContainer.css'

const StepContainer = ({
  children,
  isOpen,
  setOpen,
  stepNumber,
  stepTitle,
  stepParagraph
}) => {
  const stepContainerClass = isOpen
    ? 'step-container is-open'
    : 'step-container'

  return (
    <article className={stepContainerClass} onClick={setOpen}>
      <div className="step-container__header">
        <span className="step-container__number title">{stepNumber}</span>
        <Title text={stepTitle} />
      </div>

      {stepParagraph && (
        <p className="step-container__paragraph">{stepParagraph}</p>
      )}

      {children}
    </article>
  )
}

export default StepContainer
