'use client'
import { useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import styles from './DocumentType.module.scss'
import type {
  DocumentTypeFilterProps,
  FilterFormValues,
} from '@/types/documentType.types'
import DatePickerField from '../formfields/datePickerField'
import { BUTTON_TEXT, BUTTON_TYPES } from '@/constants/button.const'
import { Button } from '../button'
import { LABELS, NAME, PLACEHOLDERS, TOOLTIPS_TEXT } from '@/constants/input.const'

const DocumentTypeFilter = ({
  isOpen,
  onClose,
  onFilter,
  onReset,
}: DocumentTypeFilterProps) => {
  const panelRef = useRef<HTMLDivElement>(null)

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FilterFormValues>({
    defaultValues: {
      startDate: '',
      endDate: '',
    },
  })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handler)
    }
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, onClose])

  const handleReset = () => {
    reset({ startDate: '', endDate: '' })
    onReset()
  }

  const onSubmit = (values: FilterFormValues) => {
    onFilter(values)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div ref={panelRef} className={styles.panel} role="dialog">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.dateRow}>
          <Controller
            name={NAME.START_DATE}
            control={control}
            rules={{
              validate: (value) => {
                const end = getValues('endDate')
                if (value && end && value > end) {
                  return 'Start date must be before end date'
                }
                return true
              },
            }}
            render={({ field }) => (
              <DatePickerField
                label={LABELS.LAST_UPDATED_START_RANGE}
                tooltipText={TOOLTIPS_TEXT.FILTER_BY_START_DATE_OF_LAST_UPDATE}
                placeholder={PLACEHOLDERS.CHOOSE_DATE}
                value={field.value}
                onChange={field.onChange}
                error={errors.startDate?.message}
              />
            )}
          />

          <Controller
            name={NAME.END_DATE}
            control={control}
            rules={{
              validate: (value) => {
                const start = getValues('startDate')
                if (start && value && value < start) {
                  return 'End date must be after start date'
                }
                return true
              },
            }}
            render={({ field }) => (
              <DatePickerField
                label={LABELS.LAST_UPDATED_END_RANGE}
                tooltipText={TOOLTIPS_TEXT.FILTER_BY_END_DATE_OF_LAST_UPDATE}
                placeholder={PLACEHOLDERS.CHOOSE_DATE}
                value={field.value}
                onChange={field.onChange}
                error={errors.endDate?.message}
              />
            )}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type={BUTTON_TYPES.BUTTON}
            className={styles.resetBtn}
            onClick={handleReset}
          >
            {BUTTON_TEXT.RESET}
          </Button>
          <Button type={BUTTON_TYPES.SUBMIT} className={styles.filterBtn}>
            {BUTTON_TEXT.FILTER}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default DocumentTypeFilter
