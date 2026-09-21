import { useEffect, useRef, useState } from 'react'
import CircuitButton from './CircuitButton.jsx'
import Eyebrow from './Eyebrow.jsx'
import MetricsPanel from './MetricsPanel.jsx'
import PulseDot from './PulseDot.jsx'
import { startHeroShader } from '../lib/heroShader.js'
import { prefersReducedMotion } from '../lib/motion.js'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)
  const [useFallback, setUseFallback] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return
    const stop = startHeroShader(canvasRef.current)
    if (!stop) {
      setUseFallback(true)
      return
    }
    return stop
  }, [])

  return (
    <section id="inicio" aria-label="Introducción" className="lu-hero">
      {!useFallback && <canvas ref={canvasRef} className="lu-hero__canvas" aria-hidden="true" />}
      {useFallback && (
        <div className="lu-hero__fallback" aria-hidden="true">
          <div className="lu-hero__aurora lu-hero__aurora--a" />
          <div className="lu-hero__aurora lu-hero__aurora--b" />
          <div className="lu-gridbg lu-hero__fallback-grid" />
        </div>
      )}
      <div className="lu-hero__vignette" aria-hidden="true" />

      <div className="lu-hero__inner">
        <div className="lu-hero__copy">
          <div className="lu-pill">
            <PulseDot />
            <span className="lu-pill__text">Para empresas de 10 a 100 personas</span>
          </div>
          <Eyebrow gap={18}>LUDAN AI &amp; BUSINESS SOLUTIONS</Eyebrow>
          <h1 className="lu-hero__title">
            Tu empresa no necesita
            <br />
            más gente.
            <br />
            <span className="lu-metal-text">Necesita menos trabajo manual.</span>
          </h1>
          <p className="lu-hero__lede">
            Construimos agentes de IA, automatizaciones e integraciones que absorben las tareas
            repetitivas de tu operación. Alcance cerrado, plazo por escrito y el sistema queda
            siendo tuyo.
          </p>
          <div className="lu-hero__actions">
            <CircuitButton size="hero" />
          </div>
          <p className="lu-hero__note">
            Llamada de 20 minutos. Si no hay caso para automatizar, te lo decimos en la misma
            llamada.
          </p>
          <div className="lu-hero__trust">
            <span>Precio cerrado antes de empezar</span>
            <span aria-hidden="true" className="lu-hero__sep" />
            <span>Demo cada semana</span>
            <span aria-hidden="true" className="lu-hero__sep" />
            <span>El código queda en tu poder</span>
          </div>
        </div>

        <div className="lu-hero__panel">
          <MetricsPanel />
        </div>
      </div>
    </section>
  )
}
