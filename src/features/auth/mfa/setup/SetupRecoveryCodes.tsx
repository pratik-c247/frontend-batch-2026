'use client'
import styles from './SetupRecoveryCodes.module.scss'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { Button } from '@/components/common/Button'
import { KeyIcon } from '@/assets/icons/KeyIcon'
import { SetupOtherMethodsBox } from '../setupOtherMethodsBox/SetupOtherMethodBox'
import { useRecoveryCodeSetup } from '@/auth/hooks/useRecoveryCodeSetup'
import { VARIANTS } from '@/constant/common'
import { AUTH_TEXTS } from '@/features/auth/auth.constant'
import { BUTTON_NAMES } from '@/constant/buttonNames'

export const SetupRecoveryCodes = () => {
  const {
    router,
    generated,
    handleGenerate,
    handleCopy,
    leftCodes,
    rightCodes,
    handleDownload,
  } = useRecoveryCodeSetup()

  return (
    <div>
      <Button variant={VARIANTS.GHOST} className={styles.goBack} onClick={() => router.back()}>
        {BUTTON_NAMES.GO_BACK}
      </Button>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>
            <KeyIcon />
          </span>
          <h4 className={styles.title}>
            {AUTH_TEXTS.SETUP_RECOVERY_CODES.TITLE}
          </h4>
          <p className={styles.subtitle}>
            {AUTH_TEXTS.SETUP_RECOVERY_CODES.SUBTITLE}
          </p>
        </div>

        <div className={styles.warningBox}>
          {AUTH_TEXTS.SETUP_RECOVERY_CODES.WARNING}
        </div>

        {!generated && (
          <div className={styles.generateBox}>
            <h6 className={styles.generateTitle}>
              {AUTH_TEXTS.SETUP_RECOVERY_CODES.GENERATE_TITLE}
            </h6>
            <p className={styles.generateDesc}>
              <Button variant={VARIANTS.OUTLINE}
                type={BUTTON_TYPES.BUTTON}
                className={styles.generateLink}
                onClick={handleGenerate}
              >
                {AUTH_TEXTS.SETUP_RECOVERY_CODES.GENERATE_LINK_LABEL}
              </Button>{' '}
              {AUTH_TEXTS.SETUP_RECOVERY_CODES.GENERATE_DESC_PART1}
            </p>
          </div>
        )}

        {generated && (
          <div className={styles.codesBox}>
            <div className={styles.codesGrid}>
              <ul className={styles.codesList}>
                {leftCodes.map((code, i) => (
                  <li key={i} className={styles.codeItem}>
                    {code}
                  </li>
                ))}
              </ul>
              <ul className={styles.codesList}>
                {rightCodes.map((code, i) => (
                  <li key={i} className={styles.codeItem}>
                    {code}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.actionBtns}>
              <Button
                type={BUTTON_TYPES.BUTTON}
                className={styles.downloadBtn}
                onClick={handleDownload}
              >
                {BUTTON_NAMES.DOWNLOAD}
              </Button>
              <Button
                type={BUTTON_TYPES.BUTTON}
                className={styles.copyBtn}
                onClick={handleCopy}
              >
                {BUTTON_NAMES.COPY}
              </Button>
              <Button
                type={BUTTON_TYPES.BUTTON}
                variant={VARIANTS.OUTLINE}
                className={styles.cancelBtn}
                onClick={() => router.back()}
              >
                {BUTTON_NAMES.CANCEL}
              </Button>
            </div>
          </div>
        )}

        {!generated && (
          <SetupOtherMethodsBox
            currentMethod={AUTH_TEXTS.MFA.SETUP_WAYS.RECOVERY}
            showRecovery={true}
          />
        )}
      </div>
    </div>
  )
}
