import PulseDot from './PulseDot.jsx'

export default function Eyebrow({ children, gap = 20 }) {
  return (
    <div className="lu-eyebrow" style={{ marginBottom: gap }}>
      <PulseDot glow />
      <span className="lu-eyebrow__text">{children}</span>
    </div>
  )
}
