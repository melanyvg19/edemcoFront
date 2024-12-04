import { useEffect, useState } from 'react'
import FacturacionEspecial from '../FacturacionEspecial/FacturacionEspecial'
import IniciarFactura from '../IniciarFactura/IniciarFactura'
import StepContainer from '../../layouts/StepContainer/StepContainer'
import Steps from '../../molecules/Steps/Steps'
import TarifaOperadores from '../TarifaOperadores/TarifaOperadores'
import './Facturacion.css'

const Facturacion = () => {
  const [openStep, setOpenStep] = useState(1)

  useEffect(() => {
    document.title = 'Edemco - Facturación'
  }, [])

  return (
    <section className="facturacion">
      <Steps
        actualStep={openStep}
        steps={[
          'Tarifa operadores',
          'Facturación Especial',
          'Iniciar facturación'
        ]}
      />

      <StepContainer
        isOpen={openStep === 1}
        setOpen={() => setOpenStep(1)}
        stepNumber={1}
        stepTitle="Tarifa Operadores"
      >
        <TarifaOperadores setOpenStep={setOpenStep} />
      </StepContainer>

      <StepContainer
        isOpen={openStep === 2}
        setOpen={() => setOpenStep(2)}
        stepNumber={2}
        stepTitle="Facturación Especial"
      >
        <FacturacionEspecial setOpenStep={setOpenStep} />
      </StepContainer>

      <StepContainer
        isOpen={openStep === 3}
        setOpen={() => setOpenStep(3)}
        stepNumber={3}
        stepTitle="Iniciar Facturación"
        stepParagraph='Al iniciar el proceso de facturación, este tardará unos minutos, por favor espere el mensaje de confirmación.'
      >
        <IniciarFactura />
      </StepContainer>
    </section>
  )
}

export default Facturacion
