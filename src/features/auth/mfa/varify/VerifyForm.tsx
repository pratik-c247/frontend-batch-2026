import { memo } from 'react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { BUTTON_NAMES } from '@/constant/buttonNames'
import { BUTTON_TYPES } from '@/constant/Input&ButtonTypes'
import { VARIANTS } from '@/constant/common'
import { ROUTES } from '@/constant/routes'
import { codeValidation } from '@/validations/auth.validations'
import type {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from 'react-hook-form'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import styles from './VerifyShared.module.scss'

type FormData = { code: string }

interface VerifyFormProps {
  label: string
  register: UseFormRegister<FormData>
  handleSubmit: UseFormHandleSubmit<FormData>
  errors: FieldErrors<FormData>
  onSubmit: (data: FormData) => Promise<void>
  router: AppRouterInstance
}

export const VerifyForm = memo(
  ({
    label,
    register,
    handleSubmit,
    errors,
    onSubmit,
    router,
  }: VerifyFormProps) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={label}
          {...register('code', codeValidation)}
          error={errors.code?.message}
        />
        <div className={styles.btnRow}>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={VARIANTS.OUTLINE}
            onClick={() => router.push(ROUTES.LOGIN)}
          >
            {BUTTON_NAMES.CANCEL}
          </Button>
          <Button type={BUTTON_TYPES.SUBMIT}>{BUTTON_NAMES.SUBMIT}</Button>
        </div>
      </form>
    )
  },
)

VerifyForm.displayName = 'VerifyForm'
