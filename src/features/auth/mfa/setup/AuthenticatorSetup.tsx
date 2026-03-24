'use client'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import styles from './SetupAuthenticator.module.scss'
import { QRCodeCanvas } from 'qrcode.react'
import { MobileIcon } from '@/assets/icons/MobileIcon'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import Link from 'next/link'
import { SetupOtherMethodsBox } from '../setupOtherMethodsBox/SetupOtherMethodBox'
import { useAuthenticatorSetup } from '../../hooks/useAuthenticatorSetup'
import { VARIANTS } from '@/constant/common'
import { AUTH_TEXTS } from '../../auth.constant'
import { codeValidation } from '@/validations/auth.validations'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { LABELS } from '@/constant/labels'


export const SetupAuthenticator = () => {
  const {
    router,
    secret,
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSecret,
    setShowSecret,
    otpUri,
  } = useAuthenticatorSetup()
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>
            <MobileIcon />
          </span>
          <h4 className={styles.title}>
            {AUTH_TEXTS.SETUP_AUTHENTICATOR.TITLE}
          </h4>
          <p className={styles.subtitle}>
            {AUTH_TEXTS.SETUP_AUTHENTICATOR.SUBTITLE_PART1}{' '}
            <Link
              href={AUTH_TEXTS.SETUP_AUTHENTICATOR.MICROSOFT_URL}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {AUTH_TEXTS.SETUP_AUTHENTICATOR.MICROSOFT_LABEL}
            </Link>
            ,{' '}
            <Link
              href={AUTH_TEXTS.SETUP_AUTHENTICATOR.GOOGLE_URL}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {AUTH_TEXTS.SETUP_AUTHENTICATOR.GOOGLE_LABEL}
            </Link>{' '}
            {AUTH_TEXTS.SETUP_AUTHENTICATOR.SUBTITLE_PART2}
          </p>
        </div>

        <div className={styles.qrBox}>
          <h5 className={styles.qrTitle}>
            {AUTH_TEXTS.SETUP_AUTHENTICATOR.QR_TITLE}
          </h5>
          <p className={styles.qrSubtitle}>
            {AUTH_TEXTS.SETUP_AUTHENTICATOR.QR_SUBTITLE}
          </p>

          <div className={styles.qrCode}>
            {otpUri ? (
              <QRCodeCanvas value={otpUri} size={130} />
            ) : (
              <div className={styles.qrPlaceholder} />
            )}
          </div>

          <p className={styles.manualText}>
            {AUTH_TEXTS.SETUP_AUTHENTICATOR.MANUAL_TEXT_PART1}{' '}
            <Button
              variant={VARIANTS.GHOST}
              type={BUTTON_TYPES.BUTTON}
              className={styles.setupKeyLink}
              onClick={() => setShowSecret((p) => !p)}
            >
              {AUTH_TEXTS.SETUP_AUTHENTICATOR.SETUP_KEY_LABEL}
            </Button>{' '}
            {AUTH_TEXTS.SETUP_AUTHENTICATOR.MANUAL_TEXT_PART2}
          </p>

          {showSecret && (
            <div className={styles.secretBox}>
              <code className={styles.secretCode}>{secret}</code>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              label={LABELS.CODE_INPUT_LABEL}
              placeholder=""
              {...register('code',codeValidation  )}
              error={errors.code?.message}
            />
            <div className={styles.btnRow}>
              <Button
                type={BUTTON_TYPES.BUTTON}
                variant={VARIANTS.OUTLINE}
                onClick={() => router.back()}
                className={styles.cancelBtn}
              >
               {BUTTON_NAMES.CANCEL}
              </Button>
              <Button type={BUTTON_TYPES.SUBMIT} className={styles.submitBtn}>
              {BUTTON_NAMES.SUBMIT}
              </Button>
            </div>
          </form>
        </div>

        <SetupOtherMethodsBox
          currentMethod="authenticator"
          showRecovery={false}
        />
      </div>
    </div>
  )
}
