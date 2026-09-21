import { useEffect, useRef, useState } from 'react'
import './Manifesto.css'

export default function Manifesto() {
  const sectionRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const lineClass = revealed ? 'lu-manifesto__line lu-manifesto__line--in' : 'lu-manifesto__line'

  return (
    <section ref={sectionRef} aria-label="Manifiesto" className="lu-manifesto">
      <div className="lu-manifesto__inner">
        <p className={lineClass}>La automatización no reemplaza a tu equipo.</p>
        <p className={`${lineClass} lu-manifesto__line--second lu-metal-text`}>
          Le devuelve el trabajo que vale la pena hacer.
        </p>
        <div className="lu-label lu-manifesto__signature">— LUDAN AI &amp; BUSINESS SOLUTIONS</div>
      </div>
    </section>
  )
}
