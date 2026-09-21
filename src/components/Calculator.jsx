import { useEffect, useMemo, useRef, useState } from 'react'
import CircuitButton from './CircuitButton.jsx'
import SectionHeader from './SectionHeader.jsx'
import { intensityOptions } from '../data.jsx'
import { fmtInt, fmtUSD } from '../lib/format.js'
import { prefersReducedMotion } from '../lib/motion.js'
import './Calculator.css'

const WEEKS_PER_MONTH = 4.33
const CHART = { width: 400, height: 200, months: 12 }
const BOOST_THRESHOLD = 20000

function computeSavings({ people, hours, costPerHour, intensity }) {
  const freedHours = people * hours * intensity
  const monthly = freedHours * WEEKS_PER_MONTH * costPerHour
  return { freedHours, monthly, annual: monthly * 12 }
}

function buildChart(monthly) {
  const { width, height, months } = CHART
  const investment = Math.max(800, monthly * 1.4)
  const manual = []
  const automated = []
  for (let m = 0; m <= months; m++) {
    manual.push({ x: m, y: monthly * m })
    automated.push({ x: m, y: investment + monthly * m * 0.25 })
  }

  let breakEvenMonth = null
  for (let m = 1; m <= months; m++) {
    if (automated[m].y <= manual[m].y) {
      breakEvenMonth = m
      break
    }
  }

  const maxY = Math.max(...manual.map((p) => p.y), ...automated.map((p) => p.y), 1)
  const toXY = (p) => [8 + (p.x / months) * (width - 16), height - 8 - (p.y / maxY) * (height - 24)]
  const toPath = (points) =>
    points
      .map((p, i) => {
        const [x, y] = toXY(p)
        return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1)
      })
      .join(' ')

  return {
    manualPath: toPath(manual),
    automatedPath: toPath(automated),
    breakEven: breakEvenMonth ? { month: breakEvenMonth, x: toXY({ x: breakEvenMonth, y: 0 })[0] } : null,
  }
}

function Slider({ label, value, min, max, ariaLabel, onChange }) {
  return (
    <>
      <label className="lu-calc__label">
        {label} <span className="lu-calc__value">{value}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        aria-label={ariaLabel}
        className="lu-calc__slider"
      />
    </>
  )
}

export default function Calculator() {
  const [people, setPeople] = useState(4)
  const [hours, setHours] = useState(8)
  const [costPerHour, setCostPerHour] = useState(15)
  const [intensity, setIntensity] = useState(0.6)
  const [flashKey, setFlashKey] = useState(0)
  const wasBoosted = useRef(false)

  const { freedHours, monthly, annual } = computeSavings({ people, hours, costPerHour, intensity })
  const chart = useMemo(() => buildChart(monthly), [monthly])
  const boosted = annual > BOOST_THRESHOLD

  useEffect(() => {
    if (boosted && !wasBoosted.current && !prefersReducedMotion) setFlashKey((key) => key + 1)
    wasBoosted.current = boosted
  }, [boosted])

  return (
    <section aria-label="Resultados: calculadora de ahorro" className="lu-section lu-section--deep">
      <div className="lu-container">
        <SectionHeader
          eyebrow="EL NÚMERO"
          title="Poné tus datos. Hacé la cuenta vos."
          titleMax="14ch"
          titleGap={14}
          lede="No vamos a mostrarte los resultados de otra empresa. Estos son tus números."
          ledeMax="56ch"
          ledeGap={48}
        />

        <div className="lu-glass lu-calc">
          <div>
            <Slider
              label="¿Cuántas personas hacen la tarea repetitiva?"
              value={people}
              min={1}
              max={30}
              ariaLabel="Cantidad de personas"
              onChange={setPeople}
            />
            <Slider
              label="¿Cuántas horas por semana le dedica cada una?"
              value={hours}
              min={1}
              max={30}
              ariaLabel="Horas por semana"
              onChange={setHours}
            />
            <Slider
              label="Costo por hora de esa persona (USD)"
              value={costPerHour}
              min={5}
              max={60}
              ariaLabel="Costo por hora en dólares"
              onChange={setCostPerHour}
            />

            <div className="lu-calc__label">¿Qué tan repetitiva es la tarea?</div>
            <div className="lu-calc__options">
              {intensityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={intensity === option.value}
                  className={intensity === option.value ? 'lu-calc__option lu-calc__option--active' : 'lu-calc__option'}
                  onClick={() => setIntensity(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div aria-live="polite" className="lu-calc__results">
              <div>
                <div className="lu-label lu-calc__result-label">Horas / mes</div>
                <div className="lu-calc__result">{fmtInt(freedHours)}</div>
              </div>
              <div>
                <div className="lu-label lu-calc__result-label">USD / mes</div>
                <div className="lu-calc__result lu-calc__result--amber">{fmtUSD(monthly)}</div>
              </div>
              <div>
                <div className="lu-label lu-calc__result-label">USD / año</div>
                <div className="lu-calc__result lu-calc__result--lite">{fmtUSD(annual)}</div>
              </div>
            </div>

            <svg viewBox="0 0 400 200" width="100%" height="200" aria-hidden="true" className="lu-calc__chart">
              <line x1="0" y1="199" x2="400" y2="199" stroke="var(--lu-line)" strokeWidth="1" />
              <path d={chart.manualPath} fill="none" stroke="var(--lu-steel)" strokeWidth="2" />
              <path
                d={chart.automatedPath}
                fill="none"
                stroke={boosted ? '#FFF3E2' : 'var(--lu-copper)'}
                strokeWidth={boosted ? 4 : 2}
                style={{ transition: 'stroke .3s, stroke-width .3s' }}
              />
              {chart.breakEven && (
                <>
                  <line
                    x1={chart.breakEven.x}
                    x2={chart.breakEven.x}
                    y1="0"
                    y2="199"
                    stroke="var(--lu-copper-lite)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={chart.breakEven.x}
                    y="14"
                    fill="var(--lu-copper-lite)"
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Punto de equilibrio: mes {chart.breakEven.month}
                  </text>
                </>
              )}
              {flashKey > 0 && (
                <circle key={flashKey} cx="380" cy="20" r="2" fill="rgba(255,243,226,0.9)">
                  <animate attributeName="r" from="2" to="72" dur="0.38s" fill="freeze" />
                  <animate attributeName="opacity" from="1" to="0" dur="0.38s" fill="freeze" />
                </circle>
              )}
            </svg>
            <p className="lu-label lu-calc__disclaimer">
              Estimación basada en los datos que ingresaste. El porcentaje de automatización depende del
              proceso concreto y se define en el diagnóstico.
            </p>
          </div>
        </div>

        <div className="lu-calc__cta">
          <CircuitButton size="calc" />
          <p>Para saber qué porcentaje aplica a tu caso.</p>
        </div>
      </div>
    </section>
  )
}
