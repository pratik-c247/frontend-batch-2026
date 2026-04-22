import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'
import { BUTTON_TEXT } from '@/constants/button.const'

type Variant = 'primary' | 'secondary' | 'blue' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

export const Button = ({
  variant = 'primary',
  loading = false,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${className || ''}
      `}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? BUTTON_TEXT.LOADING : children}
    </button>
  )
}
