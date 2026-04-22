import { SelectHTMLAttributes, forwardRef, useState } from 'react'
import styles from './Select.module.scss'
import { GLOBAL_CONST } from '@/constants/global.const'
import { ToolTipIcon } from '@/assets/icons/ToolTipIcon'

interface Option {
  label: string
  value: string | number
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Option[]
  fullWidth?: boolean
  placeholder?: string
  tooltip?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      fullWidth = true,
      className,
      required,
      placeholder,
      tooltip,
      ...rest
    },
    ref,
  ) => {
    const [tooltipVisible, setTooltipVisible] = useState(false)

    return (
      <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && (
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
                  <ToolTipIcon/>
                </span>
                {tooltipVisible && (
                  <span className={styles.tooltipBox}>{tooltip}</span>
                )}
              </span>
            )}
          </label>
        )}

        <div className={styles.selectContainer}>
          <select
            ref={ref}
            className={`${styles.select} ${error ? styles.errorInput : ''} ${className || ''}`}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
  },
)

Select.displayName = 'Select'
