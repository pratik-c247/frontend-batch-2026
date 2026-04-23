'use client'
import { useState } from 'react'
import styles from './SubfieldModal.module.scss'
import FormWrapper from '@/comopents/common/formWrapper/FormWrapper'
// import { Input } from '@/comopents/common/input'
// import { Select } from '@/comopents/common/select'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
// import { FIELD_TYPE_OPTIONS } from '@/data/documentType'
import type { SubField } from '@/types/documentType.types'
import { Input } from '@/comopents/common/formfields/input'
import { Select } from '@/comopents/common/formfields/select'
import { FIELD_TYPE_OPTIONS } from '@/data/fieldTypeOptions'

const REQUIRED_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const generateId = () => `sf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

interface SubfieldModalProps {
  initialSubfield?: SubField
  onSave: (subfield: SubField) => void
  onClose: () => void
}

const SubfieldModal = ({ initialSubfield, onSave, onClose }: SubfieldModalProps) => {
  const [labelName, setLabelName] = useState(initialSubfield?.label_name ?? '')
  const [fieldType, setFieldType] = useState(initialSubfield?.field_type ?? '')
  const [placeholder, setPlaceholder] = useState(initialSubfield?.placeholder_text ?? '')
  const [isRequired, setIsRequired] = useState(
    initialSubfield ? (initialSubfield.is_required ? 'yes' : 'no') : '',
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!labelName.trim()) e.labelName = 'Label name is required'
    if (!fieldType) e.fieldType = 'Field type is required'
    if (!isRequired) e.isRequired = 'Mark as required is required'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    onSave({
      id: initialSubfield?.id ?? generateId(),
      label_name: labelName.trim(),
      field_type: fieldType,
      placeholder_text: placeholder.trim(),
      is_required: isRequired === 'yes',
    })
  }

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
          onChange={(e) => {
            setFieldType(e.target.value)
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
          onChange={(e) => {
            setIsRequired(e.target.value)
            setErrors((p) => ({ ...p, isRequired: '' }))
          }}
          options={REQUIRED_OPTIONS}
          placeholder="Select Mark As Required?"
          error={errors.isRequired}
        />
      </div>

      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={VARIANT.PRIMARY}
        className={styles.saveBtn}
        onClick={handleSave}
      >
        Save Field
      </Button>
    </FormWrapper>
  )
}

export default SubfieldModal
