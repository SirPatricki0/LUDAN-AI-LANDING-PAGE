// Short burst of copper sparks emitted from the right edge of a bar's canvas.
export function burstSpark(canvas) {
  if (!canvas) return
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const count = 14 + Math.floor(Math.random() * 7)
  const particles = Array.from({ length: count }, () => {
    const angle = ((-35 + Math.random() * 70) * Math.PI) / 180 - Math.PI / 2
    const speed = (60 + Math.random() * 120) / 16
    return {
      x: w - 6,
      y: h / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 520 + Math.random() * 380,
      size: 1.5 + Math.random() * 1.5,
      white: Math.random() < 0.7,
    }
  })

  const loop = () => {
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'
    let alive = false
    particles.forEach((p) => {
      if (p.life > p.maxLife) return
      alive = true
      p.vy += 240 / 3600
      p.x += p.vx
      p.y += p.vy
      p.life += 16
      const alpha = Math.max(0, 1 - Math.pow(p.life / p.maxLife, 2))
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.white ? `rgba(255,243,226,${alpha})` : `rgba(255,209,153,${alpha})`
      ctx.fill()
    })
    if (alive) requestAnimationFrame(loop)
    else ctx.clearRect(0, 0, w, h)
  }
  requestAnimationFrame(loop)
}
