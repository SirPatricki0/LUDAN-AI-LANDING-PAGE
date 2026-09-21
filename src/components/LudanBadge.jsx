import './LudanBadge.css'

export default function LudanBadge({ variant = 'nav' }) {
  return (
    <div className={`lu-badge lu-badge--${variant}`}>
      <svg viewBox="0 0 64 64" width="100%" height="100%" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>LUDAN</title>
        <rect width="64" height="64" rx="14" fill="#08080A" />
        <path
          d="M18,11 H32 A21.6,21 0 0 1 32,53 H18 A7,7 0 0 1 11,46 V18 A7,7 0 0 1 18,11 Z"
          fill="#E67A0D"
        />
        <path d="M26,20 H31 V34.4 H42 V41 H26 Z" fill="#1C1C22" />
      </svg>
    </div>
  )
}
