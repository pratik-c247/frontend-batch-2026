import styles from './Spinner.module.scss'

interface Props {
  size?: number
  className?: string
}

export const Spinner = ({ size = 20, className }: Props) => {
  return (
    <div
      className={`${styles.spinner} ${className || ''}`}
      style={{ width: size, height: size }}
    />
  )
}
