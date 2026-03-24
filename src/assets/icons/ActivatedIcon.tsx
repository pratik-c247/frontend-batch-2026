
interface Props{
  size?:number
}


export const ActivatedIcon = ({ size=64 }:Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="#22c55e"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M18 32l10 10 18-20"
        stroke="#22c55e"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
