'use client'
import type { ReactNode } from 'react'
import styles from './FormWrapper.module.scss'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import { CloseIcon } from '@/assets/icons/CloseIcon'

interface FormWrapperProps {
  title: string
  onClose: () => void
  children: ReactNode
  className?: string
}

const FormWrapper = ({
  title,
  onClose,
  children,
  className,
}: FormWrapperProps) => (
  <div className={styles.overlay} >
    <div className={`${styles.modal} ${className ?? ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={VARIANT.ICON}
          className={styles.closeBtn}
          onClick={onClose}
        >
          <CloseIcon />
        </Button>
      </div>

      <div className={styles.body}>{children}</div>
    </div>
  </div>
)

export default FormWrapper
