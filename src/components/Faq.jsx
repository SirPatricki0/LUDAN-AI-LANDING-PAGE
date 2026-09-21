import { useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import { faqs } from '../data.jsx'
import './Faq.css'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <section id="preguntas" aria-label="Preguntas frecuentes" className="lu-section">
      <div className="lu-faq">
        <SectionHeader
          eyebrow="ANTES DE ESCRIBIRNOS"
          title="Las preguntas que siempre llegan"
          titleMax="15ch"
          titleGap={40}
        />

        <div>
          {faqs.map(({ q, a }, i) => {
            const open = openIndex === i
            return (
              <div key={q} className="lu-faq__item">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className="lu-faq__question"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  <span>{q}</span>
                  <span aria-hidden="true" className={open ? 'lu-faq__icon lu-faq__icon--open' : 'lu-faq__icon'}>
                    +
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className={open ? 'lu-faq__panel lu-faq__panel--open' : 'lu-faq__panel'}
                >
                  <div className="lu-faq__clip">
                    <p className="lu-card-text lu-faq__answer">{a}</p>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="lu-faq__item" />
        </div>
      </div>
    </section>
  )
}
