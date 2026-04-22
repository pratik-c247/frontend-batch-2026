'use client'
import { useRef } from 'react'
import styles from './DatePickerField.module.scss'
import type { DatePickerFieldProps } from '@/types/documentType.types'
import { CalendarIcon } from '@/assets/icons/CalendarIcon'
import { BUTTON_TYPES } from '@/constants/button.const'
import { INPUT_TYPES } from '@/constants/input.const'
import { ToolTipIcon } from '@/assets/icons/ToolTipIcon'

const DatePickerField = ({
  label,
  tooltipText,
  value,
  onChange,
  placeholder = 'Choose a date',
  error,
}: DatePickerFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleIconClick = () => {
    inputRef.current?.showPicker?.()
    inputRef.current?.focus()
  }

  return (
    <div className={styles.fieldWrapper}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        {tooltipText && (
          <span className={styles.tooltip} title={tooltipText}>
            <ToolTipIcon />
          </span>
        )}
      </div>

      <div className={`${styles.inputWrapper} ${error ? styles.hasError : ''}`}>
        <input
          ref={inputRef}
          type={INPUT_TYPES.DATE}
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {!value && (
          <span className={styles.placeholder} onClick={handleIconClick}>
            {placeholder}
          </span>
        )}
        <button
          type={BUTTON_TYPES.BUTTON}
          className={styles.calendarBtn}
          onClick={handleIconClick}
          tabIndex={-1}
        >
          <CalendarIcon />
        </button>
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}

export default DatePickerField
