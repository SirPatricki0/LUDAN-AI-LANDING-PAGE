import { prefersReducedMotion } from './motion.js'

const HOVER_GLOW = '0 0 0 1px rgba(255,209,153,0.5), 0 10px 40px -8px rgba(230,122,13,0.75)'
const CANVAS_PADDING = 400

const routeLength = (segs) => {
  let length = 0
  for (let i = 1; i < segs.length; i++) {
    length += Math.hypot(segs[i].x - segs[i - 1].x, segs[i].y - segs[i - 1].y)
  }
  return length
}

function buildRoutes(btn, canvas, ctx, dpr) {
  const rect = btn.getBoundingClientRect()
  const totalW = rect.width + CANVAS_PADDING
  const totalH = rect.height + CANVAS_PADDING
  canvas.width = totalW * dpr
  canvas.height = totalH * dpr
  canvas.style.width = totalW + 'px'
  canvas.style.height = totalH + 'px'
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const cx = totalW / 2
  const cy = totalH / 2
  const count = 16 + Math.floor(Math.random() * 9)

  const routes = Array.from({ length: count }, () => {
    const side = Math.floor(Math.random() * 4)
    let sx, sy
    if (side === 0) { sx = cx - rect.width / 2 + Math.random() * rect.width; sy = cy - rect.height / 2 }
    else if (side === 1) { sx = cx + rect.width / 2; sy = cy - rect.height / 2 + Math.random() * rect.height }
    else if (side === 2) { sx = cx - rect.width / 2 + Math.random() * rect.width; sy = cy + rect.height / 2 }
    else { sx = cx - rect.width / 2; sy = cy - rect.height / 2 + Math.random() * rect.height }

    const dirX = side === 1 ? 1 : side === 3 ? -1 : (Math.random() > 0.5 ? 1 : -1)
    const dirY = side === 2 ? 1 : side === 0 ? -1 : (Math.random() > 0.5 ? 1 : -1)
    const segs = [{ x: sx, y: sy }]
    let px = sx, py = sy, remaining = 90 + Math.random() * 190, guard = 0
    while (remaining > 0 && guard < 8) {
      const step = Math.min(remaining, 18 * (2 + Math.floor(Math.random() * 4)))
      if (Math.random() > 0.5) px += dirX * step
      else py += dirY * step
      segs.push({ x: px, y: py })
      remaining -= step
      guard++
    }
    return { segs, delay: Math.random() * 0.4 }
  })

  const particles = routes.map((_, routeIdx) => ({
    routeIdx,
    t: Math.random(),
    speed: (60 + Math.random() * 80) / 1000,
  }))

  return { routes, particles }
}

function pointAlong(segs, distance) {
  let acc = 0
  for (let i = 1; i < segs.length; i++) {
    const a = segs[i - 1], b = segs[i]
    const segLen = Math.hypot(b.x - a.x, b.y - a.y)
    if (acc + segLen >= distance) {
      const f = segLen ? (distance - acc) / segLen : 0
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f }
    }
    acc += segLen
  }
  return segs[0]
}

// Animated copper "circuit" traces that grow around a button while it is hovered.
export function attachCircuit(btn, canvas, metalEl) {
  const ctx = canvas.getContext('2d')
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
  let raf = null, phase = 'idle', routes = [], particles = [], startTime = 0, offStart = 0, timeoutId = null

  const drawOn = (now) => {
    const t = (now - startTime) / 1000
    canvas.style.opacity = String(0.91 + Math.sin(t * Math.PI * 2 / 2.6) * 0.09)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    routes.forEach((route) => {
      const progress = Math.max(0, Math.min(1, (t - route.delay) / 1.4))
      let drawLen = routeLength(route.segs) * progress
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(230,122,13,0.6)'
      ctx.lineWidth = 1
      ctx.lineCap = 'round'
      for (let i = 1; i < route.segs.length; i++) {
        const a = route.segs[i - 1], b = route.segs[i]
        const segLen = Math.hypot(b.x - a.x, b.y - a.y)
        if (drawLen <= 0) break
        if (drawLen >= segLen) {
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); drawLen -= segLen
        } else {
          const f = drawLen / segLen
          ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f); drawLen = 0
        }
      }
      ctx.stroke()
      if (progress >= 1) {
        route.segs.forEach((p) => {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = '#FFD199'
          ctx.shadowBlur = 10
          ctx.shadowColor = '#FF9505'
          ctx.fill()
          ctx.shadowBlur = 0
        })
      }
    })

    if (t > 1.8) {
      if (phase === 'on') phase = 'hold'
      particles.forEach((p) => {
        const route = routes[p.routeIdx]
        if (!route) return
        p.t += p.speed
        if (p.t > 1) p.t = 0
        const pos = pointAlong(route.segs, routeLength(route.segs) * p.t)
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 9)
        glow.addColorStop(0, 'rgba(255,243,226,0.9)')
        glow.addColorStop(1, 'rgba(230,122,13,0)')
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
      })
    }
    raf = requestAnimationFrame(draw)
  }

  const drawOff = (now) => {
    const offT = Math.min(1, (now - offStart) / 1000)
    canvas.style.opacity = String(1 - offT)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    routes.forEach((route, i) => {
      const reverseIndex = routes.length - 1 - i
      const nodeOff = Math.max(0, Math.min(1, (offT * 1000 - reverseIndex * 45) / 300))
      if (nodeOff < 1) {
        route.segs.forEach((p) => {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,209,153,' + (1 - nodeOff) + ')'
          ctx.fill()
        })
      }
    })
    if (offT >= 1) {
      phase = 'idle'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      raf = null
      return
    }
    raf = requestAnimationFrame(draw)
  }

  const draw = (now) => {
    if (phase === 'on' || phase === 'hold') drawOn(now)
    else if (phase === 'off') drawOff(now)
  }

  const setMetalSpeed = (duration) => {
    if (metalEl) metalEl.style.animationDuration = duration
  }

  const onEnter = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return
    setMetalSpeed('4.5s')
    if (prefersReducedMotion) {
      btn.style.transition = 'box-shadow .2s'
      btn.style.boxShadow = HOVER_GLOW
      return
    }
    if (phase === 'on' || phase === 'hold') return
    ;({ routes, particles } = buildRoutes(btn, canvas, ctx, dpr))
    phase = 'on'
    startTime = performance.now()
    btn.style.transition = 'box-shadow .3s, transform .3s'
    btn.style.boxShadow = HOVER_GLOW
    btn.style.transform = 'translateY(-1px)'
    if (!raf) raf = requestAnimationFrame(draw)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (phase === 'hold' || phase === 'on') {
        phase = 'off'
        offStart = performance.now()
      }
      btn.style.boxShadow = ''
      btn.style.transform = ''
    }, 10000)
  }

  const onLeave = () => {
    setMetalSpeed('9s')
    if (prefersReducedMotion) {
      btn.style.boxShadow = ''
      return
    }
    if (phase === 'idle' || phase === 'off') return
    clearTimeout(timeoutId)
    phase = 'off'
    offStart = performance.now()
    btn.style.boxShadow = ''
    btn.style.transform = ''
  }

  const onDown = (e) => {
    if (metalEl) {
      metalEl.style.animationDuration = '2.2s'
      setTimeout(() => { metalEl.style.animationDuration = phase === 'idle' ? '9s' : '4.5s' }, 300)
    }
    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    Object.assign(ripple.style, {
      position: 'absolute',
      left: e.clientX - rect.left + 'px',
      top: e.clientY - rect.top + 'px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      pointerEvents: 'none',
      background: 'radial-gradient(circle, rgba(255,220,180,0.45) 0%, rgba(255,220,180,0) 70%)',
      animation: 'rippleAnim 0.6s ease-out',
      zIndex: '2',
    })
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }

  btn.addEventListener('pointerenter', onEnter)
  btn.addEventListener('pointerleave', onLeave)
  btn.addEventListener('pointerdown', onDown)

  return () => {
    cancelAnimationFrame(raf)
    clearTimeout(timeoutId)
    btn.removeEventListener('pointerenter', onEnter)
    btn.removeEventListener('pointerleave', onLeave)
    btn.removeEventListener('pointerdown', onDown)
  }
}
