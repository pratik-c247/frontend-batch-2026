'use client'
import { Controller } from 'react-hook-form'
import styles from './DocumentType.module.scss'
import type { DocumentTypeFilterProps } from '@/types/documentType.types'
import DatePickerField from '@/comopents/common/formfields/datePickerField'
import { BUTTON_TEXT, BUTTON_TYPES } from '@/constants/button.const'
import { Button } from '@/comopents/common/button'
import {
  LABELS,
  NAME,
  PLACEHOLDERS,
  TOOLTIPS_TEXT,
} from '@/constants/input.const'
import { useDocumentTypeFilter } from '../hooks/useDocumentTypeFilter'
import { VALIDATION_MESSAGES } from '@/constants/validationMessages'

const DocumentTypeFilter = ({
  isOpen,
  onClose,
  onFilter,
  onReset,
}: DocumentTypeFilterProps) => {
  const {
    handleSubmit,
    panelRef,
    onSubmit,
    control,
    getValues,
    errors,
    handleReset,
  } = useDocumentTypeFilter({ onClose, onFilter, onReset, isOpen })

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
                  return VALIDATION_MESSAGES.START_DATE_MUST_BE_BEFORE_END_DATE
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
                  return VALIDATION_MESSAGES.END_DATE_MUST_BE_AFTER_START_DATE
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
