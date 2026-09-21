import { useEffect, useRef, useState } from 'react'
import PulseDot from './PulseDot.jsx'
import { fmtDec, fmtInt } from '../lib/format.js'
import { prefersReducedMotion } from '../lib/motion.js'
import { burstSpark } from '../lib/spark.js'
import './MetricsPanel.css'

const BAR_LABELS = ['Consultas resueltas', 'Documentos cargados', 'Integraciones activas', 'Cobertura de reglas']
const SPARK_BAR = 3

const KPIS = [
  { key: 'tasks', label: 'Tareas proces.', format: (v) => fmtInt(v) },
  { key: 'hours', label: 'Horas / mes', format: (v) => fmtInt(v) },
  { key: 'accuracy', label: 'Precisión', format: (v) => fmtDec(v, 1) + ' %' },
]

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

function nextKpi(key, value) {
  const sign = Math.random() > 0.5 ? 1 : -1
  if (key === 'tasks') return clamp(value + sign * Math.round(Math.random() * 4), 12480, 12520)
  if (key === 'hours') return clamp(value + sign, 316, 329)
  return +clamp(value + (Math.random() - 0.5) * 0.15, 99.1, 99.6).toFixed(1)
}

function barColor(v) {
  if (v >= 99.5) return { bg: 'var(--lu-amber)', glow: 'rgba(255,149,5,0.5)' }
  if (v >= 75) return { bg: 'var(--lu-copper)', glow: 'rgba(230,122,13,0.45)' }
  if (v >= 45) return { bg: 'var(--lu-copper-deep)', glow: 'rgba(168,86,10,0.45)' }
  return { bg: 'var(--lu-steel)', glow: 'rgba(74,74,74,0.45)' }
}

function smoothSeries(points) {
  const out = []
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    for (let t = 0; t < 1; t += 0.25) {
      const t2 = t * t
      const t3 = t2 * t
      out.push(
        0.5 *
          (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3),
      )
    }
  }
  out.push(points[points.length - 1])
  return out
}

export default function MetricsPanel() {
  const canvasRef = useRef(null)
  const sparkRef = useRef(null)
  const kpiRefs = useRef({})
  const barsRef = useRef([62, 80, 54, 96])
  const [kpi, setKpi] = useState({ tasks: 12480, hours: 316, accuracy: 99.1 })
  const [bars, setBars] = useState(barsRef.current)

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    let visible = true
    const observer = new IntersectionObserver((entries) => { visible = entries[0].isIntersecting }, { threshold: 0 })
    observer.observe(canvas)

    const series = Array.from({ length: 24 }, () => 30 + Math.random() * 40)
    let target = series[series.length - 1]
    let lastPush = performance.now()
    let lastBarTick = performance.now()
    let lastSpark = 0
    const kpiDue = {}
    KPIS.forEach(({ key }) => { kpiDue[key] = performance.now() + Math.random() * 1000 })

    const bumpKpi = (key) => {
      setKpi((current) => ({ ...current, [key]: nextKpi(key, current[key]) }))
      const el = kpiRefs.current[key]
      if (!el) return
      el.style.transition = 'transform .42s cubic-bezier(0.25,1,0.5,1), text-shadow .42s'
      el.style.transform = 'scale(1.055)'
      el.style.textShadow = '0 0 18px rgba(255,149,5,0.45)'
      setTimeout(() => {
        el.style.transform = 'scale(1)'
        el.style.textShadow = 'none'
      }, 420)
    }

    const bumpBars = (now) => {
      const cooldownOver = now - lastSpark > 6000
      const next = barsRef.current.map((v, i) =>
        clamp(v + (Math.random() - 0.5) * 32, 20, cooldownOver && i === SPARK_BAR ? 100 : 96),
      )
      barsRef.current = next
      setBars(next)
      if (cooldownOver && next[SPARK_BAR] >= 99.5) {
        lastSpark = now
        burstSpark(sparkRef.current)
      }
    }

    let raf = 0
    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      if (!visible || document.hidden) return

      if (now - lastPush > 1600) {
        lastPush = now
        series.shift()
        series.push(target)
        target = clamp(target + (Math.random() - 0.5) * 22, 20, 85)
      }

      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(255,255,255,0.05)'
      ctx.lineWidth = 1
      for (let i = 1; i < 4; i++) {
        const y = (h * i) / 4
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      const smooth = smoothSeries(series)
      const stepX = w / (smooth.length - 1)
      const toY = (v) => h - ((v - 10) / 80) * h
      const path = new Path2D()
      smooth.forEach((v, i) => {
        const x = i * stepX
        const y = toY(v)
        if (i === 0) path.moveTo(x, y)
        else path.lineTo(x, y)
      })

      const fill = ctx.createLinearGradient(0, 0, 0, h)
      fill.addColorStop(0, 'rgba(230,122,13,0.30)')
      fill.addColorStop(1, 'rgba(230,122,13,0)')
      const fillPath = new Path2D(path)
      fillPath.lineTo(w, h)
      fillPath.lineTo(0, h)
      fillPath.closePath()
      ctx.fillStyle = fill
      ctx.fill(fillPath)

      ctx.save()
      ctx.shadowBlur = 26
      ctx.shadowColor = 'rgba(230,122,13,0.9)'
      ctx.globalAlpha = 0.45
      ctx.strokeStyle = '#FF9505'
      ctx.lineWidth = 2
      ctx.stroke(path)
      ctx.restore()

      ctx.save()
      ctx.shadowBlur = 16
      ctx.shadowColor = 'rgba(230,122,13,0.9)'
      ctx.strokeStyle = '#FF9505'
      ctx.lineWidth = 2
      ctx.stroke(path)
      ctx.restore()

      ctx.beginPath()
      ctx.arc((smooth.length - 1) * stepX, toY(smooth[smooth.length - 1]), 4, 0, Math.PI * 2)
      ctx.fillStyle = '#FFD199'
      ctx.shadowBlur = 12
      ctx.shadowColor = '#FF9505'
      ctx.fill()
      ctx.shadowBlur = 0

      KPIS.forEach(({ key }) => {
        if (now > kpiDue[key]) {
          kpiDue[key] = now + 2200 + Math.random() * 1200
          bumpKpi(key)
        }
      })
      if (now - lastBarTick > 2800) {
        lastBarTick = now
        bumpBars(now)
      }
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="lu-glass lu-metrics">
      <div className="lu-metrics__head">
        <div className="lu-metrics__title">
          <PulseDot size={7} duration={2} />
          <span className="lu-label">SIMULACIÓN · SISTEMA DE DEMOSTRACIÓN</span>
        </div>
        <span
          tabIndex={0}
          aria-describedby="lu-sim-tooltip"
          title="Datos de ejemplo de un sistema tipo, no de un cliente real."
          className="lu-metrics__info"
        >
          i
        </span>
        <span id="lu-sim-tooltip" className="lu-sr-only">
          Datos de ejemplo de un sistema tipo, no de un cliente real.
        </span>
      </div>

      <div className="lu-metrics__kpis">
        {KPIS.map(({ key, label, format }) => (
          <div key={key}>
            <div className="lu-label lu-metrics__kpi-label">{label}</div>
            <div ref={(el) => { kpiRefs.current[key] = el }} className="lu-metrics__kpi-value">
              {format(kpi[key])}
            </div>
          </div>
        ))}
      </div>

      <canvas ref={canvasRef} className="lu-metrics__chart" aria-hidden="true" />

      <div className="lu-metrics__bars">
        {bars.map((value, i) => {
          const color = barColor(value)
          return (
            <div key={BAR_LABELS[i]} className="lu-bar">
              <span className="lu-bar__label">{BAR_LABELS[i]}</span>
              <div className="lu-bar__track">
                <div
                  className="lu-bar__fill"
                  style={{ width: `${value}%`, background: color.bg, boxShadow: `0 0 14px ${color.glow}` }}
                />
              </div>
              {i === SPARK_BAR && <canvas ref={sparkRef} className="lu-bar__spark" aria-hidden="true" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
