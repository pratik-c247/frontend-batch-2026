'use client'
import { useRouter } from 'next/navigation'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { ROUTES } from '@/constant/routes'
import styles from './SetupOtherMethodBox.module.scss'
import { Button } from '@/components/common/Button'
import { VARIANTS } from '@/constant/common'
import { AUTH_TEXTS } from '../../auth.constant'
import { BUTTON_NAMES } from '@/constant/buttonNames'


interface Props {
  currentMethod: 'email' | 'sms' | 'authenticator' | 'recovery'
  enabledMethods?: string[]
  showRecovery?: boolean
}

const METHOD_CONFIG: Record<
  string,
  { label: string; route: string; description: string }
> = {
  authenticator: {
    label: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.authenticator.label,
    route: ROUTES.MFA.AUTHENTICATOR_SETUP,
    description:
      AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.authenticator.description,
  },
  email: {
    label: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.email.label,
    route: ROUTES.MFA.EMAIL_SETUP,
    description: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.email.description,
  },
  sms: {
    label: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.sms.label,
    route: ROUTES.MFA.SMS_SETUP,
    description: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.sms.description,
  },
}

const ALL_METHODS = ['authenticator', 'email', 'sms']

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
          // onClick={() => router.push(ROUTES.MFA.ACTIVATED)}
          onClick={() => router.back()}
        >
        {BUTTON_NAMES.SKIP_NOW}
        </Button>
      )}
    </div>
  )
}
