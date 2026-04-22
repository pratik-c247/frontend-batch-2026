'use client'
import { BUTTON_TEXT, BUTTON_TITLE, VARIANT } from '@/constants/button.const'
import styles from './DeleteModal.module.scss'
import { Button } from '@/components/ui/button'

interface ConfirmModalProps {
  open: boolean
  title?: string
  message: string
  onClose: () => void
  onConfirm: () => void
}

export const DeleteModal = ({
  open,
  title = 'Confirm Delete',
  message,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  if (!open) return null

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h5 className={styles.title}>{title}</h5>
            <Button className={styles.closeBtn} onClick={onClose}>
              {BUTTON_TEXT.CROSS}
            </Button>
          </div>

          <div className={styles.body}>
            <p>{message}</p>
          </div>

          <div className={styles.footer}>
            <Button variant={VARIANT.SECONDARY} onClick={onClose}>
              {BUTTON_TEXT.CANCEL}
            </Button>

            <Button className={styles.deleteBtn} onClick={onConfirm}>
              {BUTTON_TITLE.DELETE}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
