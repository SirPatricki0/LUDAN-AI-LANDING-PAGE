import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader.jsx'
import { services } from '../data.jsx'
import './Services.css'

export default function Services() {
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    const cards = grid.querySelectorAll('.lu-service')
    let mouseX = 0
    let mouseY = 0
    let ticking = false

    const update = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mx', mouseX - rect.left + 'px')
        card.style.setProperty('--my', mouseY - rect.top + 'px')
      })
      ticking = false
    }
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    grid.addEventListener('pointermove', onMove, { passive: true })
    return () => grid.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section id="servicios" aria-label="Servicios" className="lu-section">
      <div className="lu-container">
        <SectionHeader
          eyebrow="QUÉ CONSTRUIMOS"
          title="Cuatro formas de sacarte trabajo de encima"
          titleMax="14ch"
          titleGap={48}
        />
        <div ref={gridRef} className="lu-services__grid">
          {services.map(({ Icon, title, desc, footer }) => (
            <div key={title} className="lu-glass lu-service">
              <div aria-hidden="true" className="lu-service__spotlight" />
              <div className="lu-service__body">
                <div className="lu-icon-box lu-service__icon">
                  <Icon />
                </div>
                <h3 className="lu-card-title lu-service__title">{title}</h3>
                <p className="lu-card-text lu-service__desc">{desc}</p>
                <p className="lu-service__footer">{footer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
