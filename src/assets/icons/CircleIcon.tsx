import { CIRCUMFERENCE, RADIUS } from '@/constant/common'

interface Props {
  dashOffset: number
  strokeColor: string
  className: string
}
export const CircleIcon = ({ dashOffset, strokeColor, className }: Props) => {
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="7"
      />

      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke={strokeColor}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 50 50)"
        style={{
          transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease',
        }}
      />
    </svg>
  )
}
