import type { SubField } from '@/types/documentType.types'
import { useState } from 'react'

const generateId = () =>
  `sf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

interface useSubfiledModalProp {
  initialSubfield?: SubField
  onSave: (subfield: SubField) => void
}
export const useSubfiledModal = ({
  initialSubfield,
  onSave,
}: useSubfiledModalProp) => {
  const [labelName, setLabelName] = useState(initialSubfield?.label_name ?? '')
  const [fieldType, setFieldType] = useState(initialSubfield?.field_type ?? '')
  const [placeholder, setPlaceholder] = useState(
    initialSubfield?.placeholder_text ?? '',
  )
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

  return {
    handlers: {
      handleSave,
    },
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
  }
}
