'use client'
import React, { useRef } from 'react'
import styles from './DatePickerField.module.scss'
import type { DatePickerFieldProps } from '@/types/documentType.types'
import { InfoIcon } from '@/assets/icons/InfoIcon'
import { CalendarIcon } from '@/assets/icons/CalendarIcon'

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  tooltipText,
  value,
  onChange,
  placeholder = 'Choose a date',
  error,
}) => {
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
            <InfoIcon />
          </span>
        )}
      </div>

      <div className={`${styles.inputWrapper} ${error ? styles.hasError : ''}`}>
        <input
          ref={inputRef}
          type="date"
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
          type="button"
          className={styles.calendarBtn}
          onClick={handleIconClick}
          tabIndex={-1}
          aria-label="Open date picker"
        >
          <CalendarIcon />
        </button>
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}

export default DatePickerField
