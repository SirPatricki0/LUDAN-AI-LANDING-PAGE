import { useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader.jsx'
import { problems } from '../data.jsx'
import { prefersReducedMotion } from '../lib/motion.js'
import './Problem.css'

const MELT_SCALE = 9

// Safari/iOS render SVG displacement filters on HTML poorly, so they get a CSS shape morph instead.
const meltSupported = (() => {
  if (typeof CSS === 'undefined' || !CSS.supports || !CSS.supports('filter', 'url(#lu-melt)')) return false
  const ua = navigator.userAgent || ''
  const isIOS = /iP(hone|od|ad)/.test(ua)
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
  return !(isIOS || isSafari)
})()

function ProblemCard({ problem, index, displacementRef }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!meltSupported || prefersReducedMotion) return undefined
    const card = cardRef.current
    const displacement = displacementRef.current
    let raf = null
    let current = 0
    let target = 0

    const step = () => {
      current += (target - current) * 0.18
      displacement.setAttribute('scale', current.toFixed(2))
      raf = Math.abs(target - current) > 0.05 ? requestAnimationFrame(step) : null
    }
    const animateTo = (value) => {
      target = value
      if (!raf) raf = requestAnimationFrame(step)
    }
    const onEnter = () => animateTo(MELT_SCALE)
    const onLeave = () => animateTo(0)

    card.addEventListener('pointerenter', onEnter)
    card.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      card.removeEventListener('pointerenter', onEnter)
      card.removeEventListener('pointerleave', onLeave)
    }
  }, [displacementRef])

  return (
    <div
      ref={cardRef}
      className={meltSupported ? 'lu-problem' : 'lu-problem lu-problem--morph'}
      style={{ '--i': index }}
    >
      <div aria-hidden="true" className="lu-problem__smoke lu-problem__smoke--a" />
      <div aria-hidden="true" className="lu-problem__smoke lu-problem__smoke--b" />
      {meltSupported && <div aria-hidden="true" className="lu-problem__melt" />}
      <div aria-hidden="true" className="lu-problem__flicker" />
      <div className="lu-problem__body">
        <h3 className="lu-card-title lu-problem__title">{problem.title}</h3>
        <p className="lu-card-text">{problem.desc}</p>
      </div>
    </div>
  )
}

export default function Problem() {
  const displacementRef = useRef(null)

  return (
    <section id="problema" aria-label="El problema" className="lu-section lu-problem-section">
      <svg width="0" height="0" className="lu-problem__defs" aria-hidden="true">
        <filter
          id="lu-melt"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.009 0.016" numOctaves="3" seed="7" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="18s"
              values="0.009 0.016;0.016 0.009;0.009 0.016"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div aria-hidden="true" className="lu-gridbg" />
      <div className="lu-container">
        <SectionHeader
          eyebrow="EL COSTO DE NO AUTOMATIZAR"
          title="Tu equipo no es lento. Tus procesos sí."
          titleMax="16ch"
          titleGap={18}
          lede="Cada tarea manual que sigue existiendo es una decisión que nadie tomó conscientemente. Y se paga todos los meses."
          ledeMax="62ch"
          ledeGap={48}
        />
        <div className="lu-problem__grid">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} displacementRef={displacementRef} />
          ))}
        </div>
      </div>
    </section>
  )
}
