'use client'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import styles from './SignUp.module.scss'
import {
  emailValidation,
  FIRST_NAME,
  LAST_NAME,
  passwordValidation,
  phoneValidation,
} from '@/validations/auth.validations'
import { EyeCloseIcon } from '@/assets/icons/EyeCloseIcon'
import { EyeIcon } from '@/assets/icons/EyeIcon'
import { BUTTON_TYPES, INPUT_TYPES } from '@/constant/Input&ButtonTypes'
import { ROUTES } from '@/constant/routes'
import Link from 'next/link'
import { LABELS } from '@/constant/labels'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { AUTH_TEXTS } from './auth.constant'
import { useSignupHook } from './hooks/useSignupHook'
import { VALIDATION_MESSAGES } from '@/constant/validationMessages'
import { AUTH_MESSAGES } from '@/constant/authMessages'
import { INPUT_FIELD_NAMES } from '@/constant/inputFieldsNames'

export const SignUp = () => {
  const {
    form: { onSubmit, register, handleSubmit, errors, password },
    state: {
      showPassword,
      setShowPassword,
      showConfirmPassword,
      setShowConfirmPassword,
    },
  } = useSignupHook()

  return (
    <div>
      <h4 className={styles.signupText}>{AUTH_TEXTS.SING_UP.TITLE}</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.signupContainer}
      >
        <div className={styles.row}>
          <Input
            required
            label={LABELS.FIRST_NAME}
            {...register(INPUT_FIELD_NAMES.FIRST_NAME, FIRST_NAME)}
            error={errors.firstName?.message}
          />
          <Input
            required
            label={LABELS.LAST_NAME}
            {...register(INPUT_FIELD_NAMES.EMAIL, LAST_NAME)}
            error={errors.lastName?.message}
          />
        </div>

        <div className={styles.row}>
          <Input
            required
            label={LABELS.EMAIL}
            type={INPUT_TYPES.EMAIL}
            {...register(INPUT_FIELD_NAMES.EMAIL, emailValidation)}
            error={errors.email?.message}
          />
          <Input
            required
            label={LABELS.PHONE_NUMBER}
            type="tel"
            {...register(INPUT_FIELD_NAMES.PHONE, phoneValidation)}
            error={errors.phone?.message}
          />
        </div>

        <div className={styles.row}>
          <Input
            required
            label={LABELS.PASSWORD}
            type={showPassword ? INPUT_TYPES.TEXT : INPUT_TYPES.PASSWORD}
            {...register(INPUT_FIELD_NAMES.PASSWORD, passwordValidation)}
            error={errors.password?.message}
            rightIcon={
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ?<EyeIcon />: <EyeCloseIcon />  }
              </span>
            }
          />

          <Input
            required
            label={LABELS.CONFIRM_PASSWORD}
            type={showConfirmPassword ? INPUT_TYPES.TEXT : INPUT_TYPES.PASSWORD}
            {...register(INPUT_FIELD_NAMES.CONFIRM_PASSWORD, {
              required: VALIDATION_MESSAGES.REQUIRED('Confirm Password'),
              validate: (value) =>
                value === password || AUTH_MESSAGES.PASSWORD_DO_NOT_MATCH,
            })}
            error={errors.confirmPassword?.message}
            rightIcon={
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <EyeIcon/> : <EyeCloseIcon /> }
              </span>
            }
          />
        </div>

        <Button type={BUTTON_TYPES.SUBMIT} className={styles.btn} fullWidth>
          {BUTTON_NAMES.CREATE_ACCOUNT}
        </Button>
      </form>
      <div className={styles.notHaveText}>
        {LABELS.ALREADY_HAVE_AN_ACCOUNT}
        <Link href={ROUTES.LOGIN}>{BUTTON_NAMES.SING_IN}</Link>
      </div>{' '}
    </div>
  )
}
