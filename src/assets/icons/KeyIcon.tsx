// assets/icons/KeyIcon.tsx
interface Props {
  size?: number
  color?: string
}

export const KeyIcon = ({ size = 56, color = 'currentColor' }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M21 2l-9.6 9.6" />
    <path d="M15.5 7.5l3 3" />
  </svg>
)
