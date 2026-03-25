'use client'
import { useRouter } from 'next/navigation'
import styles from './MfaSetup.module.scss'
import { Button } from '@/components/common/Button'
import { VARIANTS } from '@/constant/common'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { AUTH_TEXTS } from '@/features/auth/auth.constant'
import { mfaMethods } from '@/constant/authMfaComponent'

export const MfaSetup = () => {
  const router = useRouter()

  return (
    <div>
      <Button
        variant={VARIANTS.GHOST}
        className={styles.goBack}
        onClick={() => router.back()}
      >
        {BUTTON_NAMES.GO_BACK}
      </Button>

      <div className={styles.mfaContainer}>
        <div className={styles.header}>
          <h4 className={styles.title}>{AUTH_TEXTS.SETUP_MFA.TITLE}</h4>
          <p className={styles.subtitle}>
            {AUTH_TEXTS.SETUP_MFA.WE_HIGHLY_RECOMMEND_ADDING}
          </p>
        </div>

        <div className={styles.alert}>
          {AUTH_TEXTS.SETUP_MFA.AT_LEAST_ONE_METHOD_REQUIRED}
        </div>

        <div className={styles.methodList}>
          {mfaMethods.map((method) => (
            <div key={method.id} className={styles.methodCard}>
              <div className={styles.methodLeft}>
                <span className={styles.methodIcon}>{method.icon}</span>
                <div className={styles.methodInfo}>
                  <div className={styles.methodLabelRow}>
                    <span className={styles.methodLabel}>{method.label}</span>
                    {method.recommended && (
                      <span className={styles.recommendedBadge}>
                        {AUTH_TEXTS.SETUP_MFA.RECOMMENDED}
                      </span>
                    )}
                  </div>
                  <p className={styles.methodDescription}>
                    {method.description}
                  </p>
                </div>
              </div>
              <Button
                variant={VARIANTS.OUTLINE}
                className={styles.setupButton}
                onClick={() => router.push(method.route)}
              >
                {BUTTON_NAMES.SETUP}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
