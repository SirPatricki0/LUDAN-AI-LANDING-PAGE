import { useEffect, useRef } from 'react'
import { attachCircuit } from '../lib/circuit.js'
import { config } from '../config.js'
import { openAgenda } from '../lib/tally.js'
import './CircuitButton.css'

export default function CircuitButton({ size = 'hero', children = 'Agendar diagnóstico' }) {
  const linkRef = useRef(null)
  const canvasRef = useRef(null)
  const metalRef = useRef(null)

  useEffect(
    () => attachCircuit(linkRef.current, canvasRef.current, metalRef.current),
    [],
  )

  return (
    <div className="lu-cbtn-wrap">
      <a
        ref={linkRef}
        className={`lu-cbtn lu-cbtn--${size}`}
        href={config.agendaUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={openAgenda}
      >
        <span ref={metalRef} className="lu-btn-metal lu-cbtn__metal" />
        <span aria-hidden="true" className="lu-cbtn__inner" />
        <span className="lu-cbtn__label">{children}</span>
      </a>
      <canvas ref={canvasRef} className="lu-cbtn__canvas" aria-hidden="true" />
    </div>
  )
}
