import SectionHeader from './SectionHeader.jsx'
import { IconCheck, IconCircleCheck } from './icons.jsx'
import { commitments, standardItems } from '../data.jsx'
import './Commitments.css'

export default function Commitments() {
  return (
    <section id="compromisos" aria-label="Compromisos y estándar de calidad" className="lu-section">
      <div className="lu-container">
        <SectionHeader
          eyebrow="CÓMO NOS HACEMOS RESPONSABLES"
          title="Lo que firmamos antes de empezar"
          titleMax="13ch"
          titleGap={18}
          lede="Somos una agencia joven y no vamos a disfrazarlo con testimonios que no tenemos. Lo que sí podemos ofrecerte es un método explícito y compromisos concretos."
          ledeMax="64ch"
          ledeGap={56}
        />

        <div className="lu-commit__grid">
          {commitments.map(({ title, desc }) => (
            <div key={title} className="lu-glass lu-commit">
              <div className="lu-commit__head">
                <IconCheck />
                <h3 className="lu-commit__title">{title}</h3>
              </div>
              <p className="lu-commit__desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="lu-standard">
          <div className="lu-label lu-standard__title">NUESTRO ESTÁNDAR DE TRABAJO</div>
          <div className="lu-standard__list">
            {standardItems.map((item) => (
              <div key={item} className="lu-standard__item">
                <IconCircleCheck />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
