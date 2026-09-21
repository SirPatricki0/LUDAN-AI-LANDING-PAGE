function StrokeIcon({ size = 20, color = '#FFB347', strokeWidth = 2, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {children}
    </svg>
  )
}

export const IconChat = () => (
  <StrokeIcon>
    <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4L21 21l-4.3-1.9a8.38 8.38 0 1 1 4.3-7.6z" />
  </StrokeIcon>
)

export const IconFlow = () => (
  <StrokeIcon>
    <path d="M4 4h6v6H4z" />
    <path d="M14 4h6v6h-6z" />
    <path d="M14 14h6v6h-6z" />
    <path d="M4 14h6v6H4z" />
  </StrokeIcon>
)

export const IconIntegration = () => (
  <StrokeIcon>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </StrokeIcon>
)

export const IconDocument = () => (
  <StrokeIcon>
    <path d="M4 4h11l5 5v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" />
    <path d="M14 4v5h5" />
  </StrokeIcon>
)

export const IconSearch = () => (
  <StrokeIcon>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </StrokeIcon>
)

export const IconPen = () => (
  <StrokeIcon>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
  </StrokeIcon>
)

export const IconWrench = () => (
  <StrokeIcon>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </StrokeIcon>
)

export const IconLifebuoy = () => (
  <StrokeIcon>
    <circle cx="12" cy="12" r="10" />
    <path d="M4.9 4.9l4.24 4.24M14.86 14.86l4.24 4.24M14.86 9.14l4.24-4.24M4.9 19.1l4.24-4.24" />
    <circle cx="12" cy="12" r="3" />
  </StrokeIcon>
)

export const IconCheck = ({ size = 16 }) => (
  <StrokeIcon size={size} color="var(--lu-copper-lite)" strokeWidth={2.5}>
    <path d="M20 6L9 17l-5-5" />
  </StrokeIcon>
)

export const IconCircleCheck = () => (
  <StrokeIcon size={14} color="var(--lu-copper-lite)">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12l2 2 4-4" />
  </StrokeIcon>
)

export const IconArrowUp = () => (
  <StrokeIcon size={14} color="currentColor">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </StrokeIcon>
)
