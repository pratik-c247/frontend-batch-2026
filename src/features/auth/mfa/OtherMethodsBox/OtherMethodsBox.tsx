'use client'

import { useRouter } from 'next/navigation'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { ROUTES } from '@/constant/routes'
import styles from './OtherMethodsBox.module.scss'
import { Button } from 'react-bootstrap'
import { VARIANTS } from '@/constant/common'
import { AUTH_TEXTS } from '@/auth/auth.constant'


interface Props {
  enabledMethods: string[]
  currentMethod: string
  hasRecoveryCodes: boolean
}

const METHOD_LABELS: Record<
  string,
  { label: string; route: string; description: string }
> = {
  authenticator: {
    label: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.authenticator.label,
    route: ROUTES.VERIFY.APP,
    description: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.authenticator.description,
  },
  email: {
    label: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.email.label,
    route: ROUTES.VERIFY.EMAIL,
    description: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.email.description,
  },
  sms: {
    label: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.sms.label,
    route: ROUTES.VERIFY.SMS,
    description: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.sms.description,
  },
}

export const OtherMethodsBox = ({
  enabledMethods,
  currentMethod,
  hasRecoveryCodes,
}: Props) => {
  const router = useRouter()

  const otherMethods = enabledMethods.filter((m) => m !== currentMethod)

  if (otherMethods.length === 0 && !hasRecoveryCodes) return null

  return (
    <div className={styles.box}>
      <h6 className={styles.title}>{AUTH_TEXTS.OTHER_METHODS_BOX.TITLE}</h6>

      {otherMethods.map((method) => {
        const config = METHOD_LABELS[method]
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

      {hasRecoveryCodes && (
        <p className={styles.item}>
          <Button
            variant={VARIANTS.GHOST}
            type={BUTTON_TYPES.BUTTON}
            className={styles.link}
            onClick={() => router.push(ROUTES.VERIFY.RECOVERY)}
          >
            {AUTH_TEXTS.OTHER_METHODS_BOX.RECOVERY.LABEL}
          </Button>{' '}
          : {AUTH_TEXTS.OTHER_METHODS_BOX.RECOVERY.DESCRIPTION}
        </p>
      )}
    </div>
  )
}
