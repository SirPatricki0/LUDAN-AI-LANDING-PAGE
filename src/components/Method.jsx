import SectionHeader from './SectionHeader.jsx'
import { methodSteps } from '../data.jsx'
import './Method.css'

export default function Method() {
  return (
    <section id="metodo" aria-label="Cómo trabajamos" className="lu-section">
      <div aria-hidden="true" className="lu-gridbg" />
      <div className="lu-container">
        <SectionHeader
          eyebrow="EL MÉTODO"
          title="Cuatro etapas. Sin sorpresas en el medio."
          titleMax="15ch"
          titleGap={18}
          lede="Trabajamos con alcance cerrado y precio fijo. Sabés qué recibís, cuándo y cuánto cuesta antes de firmar nada."
          ledeMax="62ch"
          ledeGap={56}
        />
        <div className="lu-method__grid">
          {methodSteps.map(({ number, Icon, eyebrow, title, desc }) => (
            <div key={number} className="lu-glass lu-method">
              <div className="lu-method__number">{number}</div>
              <div className="lu-icon-box lu-method__icon">
                <Icon />
              </div>
              <div className="lu-label lu-method__eyebrow">{eyebrow}</div>
              <h3 className="lu-card-title lu-method__title">{title}</h3>
              <p className="lu-card-text">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
