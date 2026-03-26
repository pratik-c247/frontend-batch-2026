'use client'
import { useRouter } from 'next/navigation'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import styles from './SetupOtherMethodBox.module.scss'
import { Button } from '@/components/common/Button'
import { VARIANTS } from '@/constant/common'
import { AUTH_TEXTS } from '@/features/auth/auth.constant'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { ALL_METHODS, METHOD_CONFIG } from '../OtherMethodsBox/OtherMethodsBox.constant'

interface Props {
  currentMethod: 'email' | 'sms' | 'authenticator' | 'recovery'
  enabledMethods?: string[]
  showRecovery?: boolean
}



export const SetupOtherMethodsBox = ({
  currentMethod,
  enabledMethods,
  showRecovery = true,
}: Props) => {
  const router = useRouter()

  const excludeList = enabledMethods ?? [currentMethod]
  const methodsToShow = ALL_METHODS.filter((m) => !excludeList.includes(m))

  if (methodsToShow.length === 0 && !showRecovery) return null

  return (
    <div className={styles.box}>
      <h6 className={styles.title}>
        {AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.TITLE}
      </h6>

      {methodsToShow.map((method) => {
        const config = METHOD_CONFIG[method]
        if (!config) return null
        return (
          <p key={method} className={styles.item}>
            <Button
              variant={VARIANTS.GHOST}
              type={BUTTON_TYPES.BUTTON}
              className={styles.link}
              onClick={() => router.push(config.route)}
            >
              {config.label}
            </Button>{' '}
            : {config.description}
          </p>
        )
      })}

      {showRecovery && (
        <Button
          variant={VARIANTS.GHOST}
          type={BUTTON_TYPES.BUTTON}
          className={styles.skipLink}
          onClick={() => router.back()}
        >
          {BUTTON_NAMES.SKIP_NOW}
        </Button>
      )}
    </div>
  )
}
