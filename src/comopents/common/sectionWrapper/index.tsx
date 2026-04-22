import styles from './SectionWrapper.module.scss'
import type { SectionWrapperProps } from '@/types/documentType.types'
import { Button } from '../button'
import PlusIcon from '@/assets/icons/PlusIcon'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'

const SectionWrapper = ({
  title,
  buttonLabel,
  onButtonClick,
  children,
  className,
}: SectionWrapperProps) => {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        {buttonLabel && (
          <Button
            variant={VARIANT.SECONDARY}
            type={BUTTON_TYPES.BUTTON}
            className={styles.addButton}
            onClick={onButtonClick}
          >
            {buttonLabel}
            <PlusIcon />
          </Button>
        )}
      </div>

      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default SectionWrapper
