interface Props{
  width?: number
  height?:number
}

export const MobileIcon = ({width=52,height=60}:Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 52 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="6"
        y="1"
        width="40"
        height="58"
        rx="6"
        stroke="#374151"
        strokeWidth="2.5"
        fill="none"
      />
      <rect x="18" y="4" width="16" height="3" rx="1.5" fill="#374151" />
      <rect x="14" y="52" width="24" height="3" rx="1.5" fill="#374151" />
    </svg>
  )
}
