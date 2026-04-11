'use client'
import { CIRCUMFERENCE, TOTAL } from '@/constant/common'
import styles from './SessionTimeoutModal.module.scss'
import { CircleIcon } from '@/assets/icons/CircleIcon'
import { Button } from 'react-bootstrap'

interface SessionProps{
  countdown: number
  onStayLoggedIn:()=>void
  onLogOut:()=>void
}


export default function SessionTimeoutModal({
  countdown,
  onStayLoggedIn,
  onLogOut,
}:SessionProps) {
  const progress = countdown / TOTAL
  const dashOffset = CIRCUMFERENCE * (1 - progress)


  const strokeColor = countdown <= 10 ? '#dc2626' : '#f59e0b'

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.timerWrapper}>
          <CircleIcon dashOffset={dashOffset} strokeColor={strokeColor} className={styles.timerSvg }  />
          <div className={styles.timerText}>
            <span className={styles.timerCount}>{countdown}</span>
            <span className={styles.timerLabel}>SECONDS</span>
          </div>
        </div>

        {/* Content */}
        <h2 className={styles.title}>Session Timeout Warning</h2>
        <p className={styles.description}>
          Your session is about to expire.
          <br />
          You will be logged out due to inactivity
        </p>

        {/* Actions */}
        <div className={styles.actions}>
          <Button className={styles.logoutBtn} onClick={onLogOut}>
            Log Out Now
          </Button>
          <Button className={styles.stayBtn} onClick={onStayLoggedIn}>
            Stay Logged In
          </Button>
        </div>
      </div>
    </div>
  )
}



