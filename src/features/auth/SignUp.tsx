'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import styles from './SignUp.module.scss'
import { saveUser } from '@/utils/indexedDB'
import { v4 as uuidv4 } from 'uuid'
import {
  emailValidation,
  FIRST_NAME,
  LAST_NAME,
  passwordValidation,
  phoneValidation,
} from '@/validations/auth.validations'
import { notify } from '@/constant/authMessages'
import { useState } from 'react'
import { EyeCloseIcon } from '@/assets/icons/EyeCloseIcon'
import { EyeIcon } from '@/assets/icons/EyeIcon'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { ROUTES } from '@/constant/routes'
import Link from 'next/link'
import type { User } from '@/types/auth.types'
import { LABELS } from '@/constant/labels'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { AUTH_TEXTS } from './auth.constant'

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>()

  const router = useRouter()
  const onSubmit = async (data: User) => {
    await saveUser({
      ...data,
      id: uuidv4(),
      mfaEnabled: [],

      mfa: {
        authenticator: {
          secret: null,
          verified: false,
        },
        email: {
          otp: null,
          expiresAt: null,
          verified: false,
        },
        sms: {
          otp: null,
          expiresAt: null,
          verified: false,
        },
      },
      createdAt: Date.now(),
    })

    notify.success('Account created successfully')
    router.push(ROUTES.LOGIN)
  }

  const password = watch('password')

  return (
    <div>
      <h4 className={styles.signupText}>{AUTH_TEXTS.SING_UP.TITLE }</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.signupContainer}
      >
        <div className={styles.row}>
          <Input
            required
            label="First Name"
            {...register('firstName', FIRST_NAME)}
            error={errors.firstName?.message}
          />
          <Input
            required
            label="Last Name"
            {...register('lastName', LAST_NAME)}
            error={errors.lastName?.message}
          />
        </div>

        <div className={styles.row}>
          <Input
            required
            label="Email"
            type="email"
            {...register('email', emailValidation)}
            error={errors.email?.message}
          />
          <Input
            required
            label="Phone Number"
            type="tel"
            {...register('phone', phoneValidation)}
            error={errors.phone?.message}
          />
        </div>

        <div className={styles.row}>
          <Input
            required
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', passwordValidation)}
            error={errors.password?.message}
            rightIcon={
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
              </span>
            }
          />

          <Input
            required
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              required: 'Confirm password required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
            rightIcon={
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <EyeCloseIcon /> : <EyeIcon />}
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
        <Link href={ROUTES.LOGIN}>{BUTTON_NAMES.SING_IN }</Link>
      </div>{' '}
    </div>
  )
}
