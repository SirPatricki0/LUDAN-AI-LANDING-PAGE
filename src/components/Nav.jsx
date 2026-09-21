import { useEffect, useRef, useState } from 'react'
import CircuitButton from './CircuitButton.jsx'
import LudanBadge from './LudanBadge.jsx'
import { config } from '../config.js'
import { openAgenda } from '../lib/tally.js'
import './Nav.css'

const LINKS = [
  { href: '#problema', label: 'Problema' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#metodo', label: 'Método' },
  { href: '#compromisos', label: 'Compromisos' },
  { href: '#preguntas', label: 'Preguntas' },
]

export default function Nav() {
  const sentinelRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setScrolled(!entries[0].isIntersecting),
      { threshold: 0, rootMargin: '-40px 0px 0px 0px' },
    )
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleMenu = () => setMenuOpen((open) => !open)

  return (
    <header>
      <div ref={sentinelRef} className="lu-nav__sentinel" aria-hidden="true" />
      <div className={scrolled ? 'lu-nav lu-nav--scrolled' : 'lu-nav'}>
        <nav className="lu-nav__bar" aria-label="Principal">
          <a href="#inicio" className="lu-logo">
            <LudanBadge variant="nav" />
            <span className="lu-logo__text">LUDAN</span>
          </a>

          <div className="lu-nav__links">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="lu-nav__link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="lu-nav__cta">
            <CircuitButton size="nav" />
          </div>

          <button
            type="button"
            className="lu-nav__burger"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className={menuOpen ? 'lu-nav__line lu-nav__line--top-open' : 'lu-nav__line'} />
            <span className={menuOpen ? 'lu-nav__line lu-nav__line--bottom-open' : 'lu-nav__line'} />
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="lu-menu">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="lu-menu__link" onClick={toggleMenu}>
              {link.label}
            </a>
          ))}
          <a
            href={config.whatsapp}
            className="lu-menu__whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMenu}
          >
            Escribinos
          </a>
          <a
            href={config.agendaUrl}
            className="lu-btn-solid lu-menu__cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              openAgenda(e)
              toggleMenu()
            }}
          >
            Agendar diagnóstico
          </a>
          <button type="button" className="lu-menu__close" aria-label="Cerrar menú" onClick={toggleMenu}>
            ×
          </button>
        </div>
      )}
    </header>
  )
}
