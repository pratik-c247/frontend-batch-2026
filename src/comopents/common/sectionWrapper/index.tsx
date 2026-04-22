import React from 'react'
import styles from './SectionWrapper.module.scss'
import type { SectionWrapperProps } from '../../types'

const PlusIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  buttonLabel,
  onButtonClick,
  children,
  className,
}) => {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      {/* ── Header Bar ── */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        {buttonLabel && (
          <button
            type="button"
            className={styles.addButton}
            onClick={onButtonClick}
          >
            {buttonLabel}
            <PlusIcon />
          </button>
        )}
      </div>

      {/* ── Body / Children ── */}
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default SectionWrapper
