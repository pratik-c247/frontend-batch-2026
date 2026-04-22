import { InputHTMLAttributes, forwardRef, useState } from 'react'
import styles from './Input.module.scss'
import { GLOBAL_CONST } from '@/constants/global.const'
import { ToolTipIcon } from '@/assets/icons/ToolTipIcon'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
  tooltip?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { required, tooltip, label, error, fullWidth = true, className, ...rest },
    ref,
  ) => {
    const [tooltipVisible, setTooltipVisible] = useState(false)
    return (
      <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
        <label className={styles.label}>
          {label}
          {required && (
            <span className={styles.required}>{GLOBAL_CONST.REQUIRED}</span>
          )}
          {tooltip && (
            <span
              className={styles.tooltipAnchor}
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              <span className={styles.infoIcon}>
                <ToolTipIcon />
              </span>
              {tooltipVisible && (
                <span className={styles.tooltipBox}>{tooltip}</span>
              )}
            </span>
          )}
        </label>

        <div className={styles.inputContainer}>
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.errorInput : ''}  ${className}`}
            {...rest}
          />
        </div>

        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
