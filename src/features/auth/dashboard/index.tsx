'use client'
import { useRouter } from 'next/navigation'
import styles from './Dashboard.module.scss'
import SessionTimeoutModal from '@/components/common/sessionTimeoutModal'
import { useAutoLogout } from '../hooks/useAutoLogout'

export default function DashboardPage() {
  const router = useRouter()
  const { showWarning, countdown, logout, stayLoggedIn } = useAutoLogout()

  const handleManualLogout = () => {
    logout()
  }

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <span className={styles.brand}>MyApp</span>
        <button className={styles.logoutButton} onClick={handleManualLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </header>

      {/* Dashboard content */}
      <main className={styles.main}>
        <h1 className={styles.heading}>You are on Dashboard</h1>
        <p className={styles.sub}>
          Your session will automatically expire after 1 minute of inactivity.
        </p>
      </main>

      {/* Auto logout warning modal */}
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
