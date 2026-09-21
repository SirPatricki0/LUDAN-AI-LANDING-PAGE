export default function PulseDot({ size = 6, duration = 2.4, glow = false }) {
  return (
    <span className={glow ? 'lu-dot lu-dot--glow' : 'lu-dot'} style={{ width: size, height: size }}>
      <span aria-hidden="true" className="lu-dot__ring" style={{ animationDuration: `${duration}s` }} />
    </span>
  )
}
