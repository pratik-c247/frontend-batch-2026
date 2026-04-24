'use client'

import styles from './SubfieldModal.module.scss'
import FormWrapper from '@/comopents/common/formWrapper/FormWrapper'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import type { SubField } from '@/types/documentType.types'
import { Input } from '@/comopents/common/formfields/input'
import { Select } from '@/comopents/common/formfields/select'
import { FIELD_TYPE_OPTIONS } from '@/data/fieldTypeOptions'
import { useSubfiledModal } from '@/features/documentTypes/hooks/useSubfiledModal'
import { REQUIRED_FIELD_OPTIONS } from '@/data/helper'

interface SubfieldModalProps {
  initialSubfield?: SubField
  onSave: (subfield: SubField) => void
  onClose: () => void
}

const SubfieldModal = ({
  initialSubfield,
  onSave,
  onClose,
}: SubfieldModalProps) => {
  const {
    handlers: { handleSave },
    states: {
      errors,
      fieldType,
      placeholder,
      isRequired,
      labelName,
      setPlaceholder,
      setErrors,
      setIsRequired,
      setLabelName,
      setFieldType,
    },
  } = useSubfiledModal({ initialSubfield, onSave })
  return (
    <FormWrapper
      title={initialSubfield ? 'Edit Subfield' : 'Add Subfield'}
      onClose={onClose}
      className={styles.modal}
    >
      <div className={styles.row}>
        <Input
          label="Label Name"
          required
          value={labelName}
          onChange={(e) => {
            setLabelName(e.target.value)
            setErrors((p) => ({ ...p, labelName: '' }))
          }}
          error={errors.labelName}
        />
        <Select
          label="Field Type"
          required
          value={fieldType}
          onChange={(value) => {
            setFieldType(String(value))
            setErrors((p) => ({ ...p, fieldType: '' }))
          }}
          options={FIELD_TYPE_OPTIONS}
          placeholder="Select Field Type"
          error={errors.fieldType}
        />
      </div>

      <div className={styles.row}>
        <Input
          label="Placeholder Text"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
        <Select
          label="Mark as Required?"
          required
          value={isRequired}
          onChange={(value) => {
            setIsRequired(String(value))
            setErrors((p) => ({ ...p, isRequired: '' }))
          }}
          options={REQUIRED_FIELD_OPTIONS}
          placeholder="Select Mark As Required?"
          error={errors.isRequired}
        />
      </div>

      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={VARIANT.BLUE}
        className={styles.saveBtn}
        onClick={handleSave}
      >
        Save Fields
      </Button>
    </FormWrapper>
  )
}

export default SubfieldModal
