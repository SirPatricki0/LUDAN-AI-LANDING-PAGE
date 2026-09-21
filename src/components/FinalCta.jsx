import CircuitButton from './CircuitButton.jsx'
import { config } from '../config.js'
import './FinalCta.css'

export default function FinalCta() {
  return (
    <section aria-label="Llamado a la acción" className="lu-final">
      <div aria-hidden="true" className="lu-final__glow" />
      <div className="lu-final__inner">
        <h2 className="lu-h2 lu-metal-text lu-final__title">¿Empezamos por el proceso que más duele?</h2>
        <p className="lu-lede lu-final__lede">
          Veinte minutos, sin costo y sin compromiso. Salís con un diagnóstico aunque después no
          trabajemos juntos.
        </p>
        <CircuitButton size="cta" />
        <div className="lu-final__alt">
          <a href={config.whatsapp} target="_blank" rel="noopener noreferrer">
            o escribinos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
