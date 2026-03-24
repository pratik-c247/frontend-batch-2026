import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { required, label, error, fullWidth = true, className, rightIcon, ...rest },
    ref,
  ) => {
    return (
      <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>

        <div className={styles.inputContainer}>
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.errorInput : ''} ${rightIcon ? styles.withIcon : ''} ${className}`}
            {...rest}
          />

          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </div>

        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
