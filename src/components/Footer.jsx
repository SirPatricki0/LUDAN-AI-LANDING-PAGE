import LudanBadge from './LudanBadge.jsx'
import { IconArrowUp } from './icons.jsx'
import { prefersReducedMotion } from '../lib/motion.js'
import { config } from '../config.js'
import { openAgenda } from '../lib/tally.js'
import './Footer.css'

const COLUMNS = [
  {
    title: 'SERVICIOS',
    links: [
      { label: 'Agentes de IA', href: '#servicios' },
      { label: 'Automatización', href: '#servicios' },
      { label: 'Integraciones', href: '#servicios' },
      { label: 'Documentos', href: '#servicios' },
    ],
  },
  {
    title: 'EMPRESA',
    links: [
      { label: 'El método', href: '#metodo' },
      { label: 'Compromisos', href: '#compromisos' },
      { label: 'Preguntas frecuentes', href: '#preguntas' },
    ],
  },
  {
    title: 'CONTACTO',
    links: [
      { label: config.email, href: `mailto:${config.email}` },
      { label: 'Agendar diagnóstico', href: config.agendaUrl, external: true, onClick: openAgenda },
    ],
  },
]

const scrollTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })

export default function Footer() {
  return (
    <footer className="lu-footer">
      <span aria-hidden="true" className="lu-footer__mark">
        LUDAN
      </span>
      <div className="lu-container lu-footer__inner">
        <div className="lu-footer__grid">
          <div>
            <div className="lu-footer__brand">
              <LudanBadge variant="footer" />
              <span className="lu-footer__name">LUDAN</span>
            </div>
            <p className="lu-footer__tagline">Inteligencia que trabaja para tu negocio.</p>
            <p className="lu-label">Montevideo, Uruguay</p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <div className="lu-label lu-footer__heading">{column.title}</div>
              <div className="lu-footer__links">
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={link.onClick}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lu-footer__bottom">
          <span className="lu-label lu-footer__legal">© 2026 LUDAN AI &amp; Business Solutions.</span>
          <button type="button" className="lu-footer__top" aria-label="Volver arriba" onClick={scrollTop}>
            <IconArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
