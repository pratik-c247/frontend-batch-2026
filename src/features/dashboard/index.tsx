'use client'
import styles from './Dashboard.module.scss'
import SessionTimeoutModal from '@/components/common/sessionTimeoutModal'
import { LogOutIcon } from '@/assets/icons/LogoutIcon'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { DASHBOARD_CONST } from '@/features/dashboard.const'
import { useAutoLogout } from '../auth/hooks/useAutoLogout'
import { Button } from 'react-bootstrap'

export default function DashboardPage() {
  const { showWarning, countdown, logout, stayLoggedIn } = useAutoLogout()

  const handleManualLogout = () => {
    logout()
  }

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <span className={styles.brand}>{DASHBOARD_CONST.MY_APP}</span>
        <Button className={styles.logoutButton} onClick={handleManualLogout}>
          <LogOutIcon />
          {BUTTON_NAMES.LOG_OUT}
        </Button>
      </header>

      <main className={styles.main}>
        <h1 className={styles.heading}>
          {DASHBOARD_CONST.YOU_ARE_ON_DASHBOARD}
        </h1>
        <p className={styles.sub}>
          {DASHBOARD_CONST.YOUR_SESSION_WILL_AUTOMATICALLY}
        </p>
      </main>

      {showWarning && (
        <SessionTimeoutModal
          countdown={countdown}
          onStayLoggedIn={stayLoggedIn}
          onLogOut={logout}
        />
      )}
    </div>
  )
}
