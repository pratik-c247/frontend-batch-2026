import type { DocumentField, SubField } from '@/types/documentType.types'
import { useState } from 'react'

const TYPES_WITH_OPTIONS = [
  'custom_dropdown',
  'multi_select_dropdown',
  'radio_button',
  'checkbox',
]
const TYPES_WITH_SUBFIELDS = ['toggle_switch']
const TYPES_WITHOUT_PLACEHOLDER = ['checkbox', 'toggle_switch', 'radio_button']

interface useAddFieldFormProps {
  initialField?: DocumentField
  onSave: (field: DocumentField) => void
}
const generateId = () =>
  `field_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

export const useAddFieldForm = ({
  initialField,
  onSave,
}: useAddFieldFormProps) => {
  const [labelName, setLabelName] = useState(initialField?.label_name ?? '')
  const [fieldType, setFieldType] = useState(initialField?.field_type ?? '')
  const [placeholderText, setPlaceholderText] = useState(
    initialField?.placeholder_text ?? '',
  )
  const [isRequired, setIsRequired] = useState<string>(
    initialField ? (initialField.is_required ? 'yes' : 'no') : '',
  )
  const [options, setOptions] = useState<string[]>(initialField?.options ?? [])
  const [subfields, setSubfields] = useState<SubField[]>(
    initialField?.subfields ?? [],
  )
  const [isSubDocument, setIsSubDocument] = useState(
    initialField?.is_sub_document ?? false,
  )
  const [showOptionsModal, setShowOptionsModal] = useState(false)
  const [showSubfieldModal, setShowSubfieldModal] = useState(false)
  const [editingSubfield, setEditingSubfield] = useState<SubField | undefined>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const hasOptions = TYPES_WITH_OPTIONS.includes(fieldType)
  const hasSubfields = TYPES_WITH_SUBFIELDS.includes(fieldType)
  const showPlaceholder = !TYPES_WITHOUT_PLACEHOLDER.includes(fieldType)
  const showIsRequired = !hasSubfields

  const validate = () => {
    const e: Record<string, string> = {}
    if (!labelName.trim()) e.labelName = 'Label name is required'
    if (!fieldType) e.fieldType = 'Field type is required'
    if (showIsRequired && !isRequired)
      e.isRequired = 'Mark as required is required'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }

    onSave({
      id: initialField?.id ?? generateId(),
      label_name: labelName.trim(),
      field_type: fieldType,
      placeholder_text: placeholderText.trim(),
      is_required: isRequired === 'yes',
      ...(hasOptions && { options }),
      ...(hasSubfields && { subfields }),
      ...(fieldType === 'checkbox' && { is_sub_document: isSubDocument }),
    })
  }

  const handleFieldTypeChange = (val: string) => {
    setFieldType(val)
    setOptions([])
    setSubfields([])
    setIsSubDocument(false)
    setErrors((prev) => ({ ...prev, fieldType: '' }))
  }

  const handleSaveSubfield = (sf: SubField) => {
    if (editingSubfield) {
      setSubfields((prev) => prev.map((s) => (s.id === sf.id ? sf : s)))
    } else {
      setSubfields((prev) => [...prev, sf])
    }
    setEditingSubfield(undefined)
    setShowSubfieldModal(false)
  }

  const handleDeleteSubfield = (id: string) =>
    setSubfields((prev) => prev.filter((s) => s.id !== id))

  return {
    stateValues: {
      setLabelName,
      setErrors,
      setEditingSubfield,
      setShowOptionsModal,
      setIsSubDocument,
      setOptions,
      setShowSubfieldModal,
      setPlaceholderText,
      setIsRequired,
    },
    stateSetter: {
      labelName,
      errors,
      fieldType,
      hasOptions,
      options,
      hasSubfields,
      subfields,
      isSubDocument,
      showIsRequired,
      showPlaceholder,
      placeholderText,
      isRequired,
      showOptionsModal,
      showSubfieldModal,
      editingSubfield,
    },
    handler: {
      handleDeleteSubfield,
      handleSaveSubfield,
      handleFieldTypeChange,
      handleSave,
    },
  }
}
