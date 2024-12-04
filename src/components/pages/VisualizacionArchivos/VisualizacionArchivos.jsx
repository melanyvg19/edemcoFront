import React, { useEffect } from 'react'
import Container from '../../layouts/Container/Container'
import './VisualizacionArchivos.css'

const VisualizacionArchivos = () => {
  useEffect(() => {
    document.title = 'Edemco - Visualización de Archivos'
  }, [])

  return (
    <>
      <Container>
        <div className="reportContainer">
          <iframe
            title="informe comercial version3"
            src="https://app.powerbi.com/reportEmbed?reportId=ee9375d0-4c95-4b18-88d8-9fd8d2e260b8&autoAuth=true&ctid=dfeb1d64-2c83-434a-bf21-c6696d5322ec"
            frameBorder="0"
            allowFullScreen={true}
            className="visualizacion-grafica"
          ></iframe>
        </div>
      </Container>
    </>
  )
}

export default VisualizacionArchivos
