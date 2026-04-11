'use client'
import { AUTO_LOGOUT_CONST, CIRCUMFERENCE, TOTAL } from '@/constant/common'
import styles from './SessionTimeoutModal.module.scss'
import { CircleIcon } from '@/assets/icons/CircleIcon'
import { Button } from 'react-bootstrap'
import { BUTTON_NAMES } from '@/constant/buttonNames'

interface SessionProps {
  countdown: number
  onStayLoggedIn: () => void
  onLogOut: () => void
}

export default function SessionTimeoutModal({
  countdown,
  onStayLoggedIn,
  onLogOut,
}: SessionProps) {
  const progress = countdown / TOTAL
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const strokeColor = countdown <= 10 ? '#dc2626' : '#f59e0b'

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.timerWrapper}>
          <CircleIcon
            dashOffset={dashOffset}
            strokeColor={strokeColor}
            className={styles.timerSvg}
          />
          <div className={styles.timerText}>
            <span className={styles.timerCount}>{countdown}</span>
            <span className={styles.timerLabel}>
              {AUTO_LOGOUT_CONST.SECONDS}
            </span>
          </div>
        </div>

        <h2 className={styles.title}>
          {AUTO_LOGOUT_CONST.SESSION_TIMEOUT_WARNING}
        </h2>
        <p className={styles.description}>
          {AUTO_LOGOUT_CONST.YOUR_SESSION_IS_ABOUT_TO_EXPIRE}
          <br />
          {AUTO_LOGOUT_CONST.YOU_WILL_BE_LOGGED_OUT}
        </p>

        <div className={styles.actions}>
          <Button className={styles.logoutBtn} onClick={onLogOut}>
            {BUTTON_NAMES.LOG_OUT_NOW}
          </Button>
          <Button className={styles.stayBtn} onClick={onStayLoggedIn}>
            {BUTTON_NAMES.STAY_LOGGED_IN}
          </Button>
        </div>
      </div>
    </div>
  )
}
