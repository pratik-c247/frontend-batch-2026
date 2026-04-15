'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './Select.module.scss'

type Option = {
  label: string
  value: string
}

type SelectProps = {
  label?: string
  options: Option[]
  value?: string
  placeholder?: string
  required?: boolean
  onChange?: (value: string) => void
}

export default function Select({
  label,
  options,
  value,
  placeholder = 'Select...',
  required,
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find(opt => opt.value === value)

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>(Required)</span>}
        </label>
      )}

      <div
        className={`${styles.selectBox} ${open ? styles.open : ''}`}
        onClick={() => setOpen(prev => !prev)}
      >
        <span className={!selected ? styles.placeholder : ''}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={styles.arrow}>▾</span>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {options.map(option => (
            <div
              key={option.value}
              className={`${styles.option} ${
                value === option.value ? styles.active : ''
              }`}
              onClick={() => {
                onChange?.(option.value)
                setOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}