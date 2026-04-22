import { BUTTON_TEXT, BUTTON_TYPES } from '@/constants/button.const'
import { Button } from '../button'
import styles from './Switch.module.scss'

type SwitchProps = {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

export const Switch = ({ label, checked, onChange }: SwitchProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <div className={styles.toggle}>
        <Button
          type={BUTTON_TYPES.BUTTON}
          className={`${styles.option} ${checked ? styles.active : ''}`}
          onClick={() => onChange(true)}
        >
          {BUTTON_TEXT.YES}
        </Button>
        <Button
          type={BUTTON_TYPES.BUTTON}
          className={`${styles.option} ${!checked ? styles.active : ''}`}
          onClick={() => onChange(false)}
        >
          {BUTTON_TEXT.NO}
        </Button>
      </div>
    </div>
  )
}
