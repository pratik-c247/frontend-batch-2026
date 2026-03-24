'use client'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import styles from './Login.module.scss'
import { EyeIcon } from '@/assets/icons/EyeIcon'
import { EyeCloseIcon } from '@/assets/icons/EyeCloseIcon'
import { BUTTON_TYPES, INPUT_TYPES } from '@/constant/Input&ButtonTypes'
import { ROUTES } from '@/constant/routes'
import Link from 'next/link'
import { LABELS } from '@/constant/labels'
import { useLogin } from './hooks/useLogin'
import type { LoginFormData } from '@/types/auth.types'
import {
  emailValidation,
  passwordRequired,
} from '@/validations/auth.validations'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { AUTH_TEXTS } from './auth.constant'
import { INPUT_FIELD_NAMES } from '@/constant/inputFieldsNames'

export const Login = () => {
  const {
    showPassword,
    togglePassword,
    login,
    register,
    handleSubmit,
    errors,
    reset,
  } = useLogin()

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password)
    reset()
  }

  return (
    <div>
      <h4 className={styles.loginText}>{AUTH_TEXTS.SIGN_IN.TITLE}</h4>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginContainer}>
        <Input
          required
          label={LABELS.EMAIL}
          type={INPUT_TYPES.EMAIL}
          {...register(INPUT_FIELD_NAMES.EMAIL, emailValidation)}
          error={errors.email?.message}
        />

        <Input
          required
          label={LABELS.PASSWORD}
          type={showPassword ? INPUT_TYPES.TEXT : INPUT_TYPES.PASSWORD}
          {...register(INPUT_FIELD_NAMES.PASSWORD, passwordRequired)}
          error={errors.password?.message}
          rightIcon={
            <span onClick={togglePassword}>
              {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
            </span>
          }
        />

        <Button type={BUTTON_TYPES.SUBMIT} className={styles.btn}>
          {BUTTON_NAMES.SING_IN}
        </Button>
      </form>
      <div className={styles.notHaveText}>
        {LABELS.DO_NOT_HAVE_AN_ACCOUNT}
        <Link href={ROUTES.SIGNUP}>{BUTTON_NAMES.SIGN_UP}</Link>
      </div>
    </div>
  )
}
