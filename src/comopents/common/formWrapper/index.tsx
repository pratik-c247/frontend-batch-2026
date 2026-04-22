import React from 'react'
import styles from './FormWrapper.module.scss'
import { Button } from '../button'
import PlusIcon from '@/assets/icons/PlusIcon'
import { EditIcon } from '@/assets/icons/EditIcon'
import { BUTTON_TEXT, VARIANT } from '@/constants/button.const'

interface FormWrapperProps {
  title: string
  leftText?: string
  isModal?: boolean
  onClose?: () => void
  onEdit?: boolean

  onButton?: boolean
  ButtonText?: string
  className?: string
  onButtonClick?: () => void
  children: React.ReactNode
}

function SectionWrapper({
  title,
  leftText,
  isModal = false,
  onEdit = false,
  onButton,
  ButtonText = BUTTON_TEXT.ADD_INSURER,
  onClose,
  onButtonClick,
  children,
  className,
}: FormWrapperProps) {
  const content = (
    <div
      className={`${styles.wrapper}${className || ''} ${isModal ? styles.modalWrapper : styles.formWrapper}`}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {leftText && <span className={styles.leftText}>{leftText}</span>}
        
        </div>
        {onEdit && (
          <div className={styles.EditBox}>
            <EditIcon />
          </div>
        )}
        {onButton && (
          <Button variant={VARIANT.SECONDARY} onClick={onButtonClick}>
            {ButtonText}
            <PlusIcon />
          </Button>
        )}

        {isModal && onClose && (
          <Button className={styles.closeBtn} onClick={onClose}>
            ✕
          </Button>
        )}
      </div>

      <div className={styles.body}>{children}</div>
    </div>
  )

  if (isModal) {
    return <div className={styles.overlay}>{content}</div>
  }

  return content
}

export default FormWrapper
