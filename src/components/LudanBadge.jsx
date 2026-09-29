import { useId } from 'react'
import './LudanBadge.css'

// Isotipo LUDAN — rediseño "L - Variante A" (LUDAN Brand/LUDAN Logo Redesign),
// versión color: fondo cobre, contorno "D" y marca "L" en tono oscuro.
export default function LudanBadge({ variant = 'nav' }) {
  const gradientId = useId()
  return (
    <div className={`lu-badge lu-badge--${variant}`}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>LUDAN</title>
        <rect width="200" height="200" rx="46" fill="#E8790C" />
        <path
          d="M46 26H100C152 26 176 58 176 100C176 142 152 174 100 174H46Q26 174 26 154V46Q26 26 46 26Z"
          fill="none"
          stroke="#1E1C22"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="96" y1="140" x2="82" y2="126">
            <stop offset="0" stopColor="#4B4853" />
            <stop offset="1" stopColor="#9A96A2" />
          </linearGradient>
        </defs>
        <g transform="translate(101 100) skewX(-6) translate(-101 -100)">
          <polygon points="68,74 96,60 96,112 68,140" fill="#1E1C22" />
          <polygon points="96,112 134,112 120,140 96,140" fill="#1E1C22" />
          <polygon points="68,140 96,112 96,140" fill={`url(#${gradientId})`} />
        </g>
      </svg>
    </div>
  )
}
