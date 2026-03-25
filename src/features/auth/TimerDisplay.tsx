'use client'
import { useEffect, useState } from 'react'
import type { TimerStore } from '@/auth/hooks/useTimerStore'
import { formatTime } from '@/utils/helpers'
import { LABELS } from '@/constant/labels'
import { VARIANTS } from '@/constant/common'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { Button } from '@/components/common/Button'
import styles from '../auth/mfa/varify/VerifyShared.module.scss'

interface TimerDisplayProps {
  timerStore: TimerStore
  onResend: () => void
}

export const TimerDisplay = ({ timerStore, onResend }: TimerDisplayProps) => {
  const [timeLeft, setTimeLeft] = useState(() => timerStore.getTimeLeft())

  useEffect(() => {
    const unsubscribe = timerStore.subscribe(setTimeLeft)
    return unsubscribe
  }, [timerStore])

  return (
    <>
      <div className={styles.timerRow}>
        <span className={styles.timerText}>
          {LABELS.TIMER_LABEL}
          <span className={styles.timerValue}>{formatTime(timeLeft)}</span>
        </span>
      </div>
      <div className={styles.resendRow}>
        <span className={styles.resendText}>{LABELS.RESEND_TEXT}</span>
        <Button
          variant={VARIANTS.OUTLINE}
          type={BUTTON_TYPES.BUTTON}
          className={styles.resendLink}
          onClick={onResend}
          disabled={timeLeft > 0}
        >
          {BUTTON_NAMES.RESEND_CODE}
        </Button>
      </div>
    </>
  )
}
