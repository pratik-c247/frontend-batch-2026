import { useState } from 'react'
import type { DocumentField, DocumentTypeFormValues, PredefinedFieldState } from '@/types/documentType.types'

const PREDEFINED_DEFAULTS: PredefinedFieldState = {
  expiry_date: false,
  document_date: false,
}

interface PredefinedRow {
  id: string
  label: string
  placeholder: string
  field_type: string
  checked: boolean
}

const toPredefinedRows = (state: PredefinedFieldState): PredefinedRow[] => [
  {
    id: 'expiry_date',
    label: 'Expiry Date',
    placeholder: 'Choose a Date',
    field_type: 'Date',
    checked: state.expiry_date,
  },
  {
    id: 'document_date',
    label: 'Document Date',
    placeholder: 'Choose a Date',
    field_type: 'Date',
    checked: state.document_date,
  },
]

const generateId = () => `field_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

export const useDocumentTypeForm = (initialValues?: DocumentTypeFormValues) => {
  const [documentTypeName, setDocumentTypeName] = useState(
    initialValues?.document_type ?? '',
  )
  const [isSensitive, setIsSensitive] = useState(
    initialValues?.is_document_sensitive ?? false,
  )
  const [requiresApproval, setRequiresApproval] = useState(
    initialValues?.is_required_document_approval ?? true,
  )
  const [predefinedRows, setPredefinedRows] = useState<PredefinedRow[]>(
    toPredefinedRows(initialValues?.predefined_fields ?? PREDEFINED_DEFAULTS),
  )
  const [fields, setFields] = useState<DocumentField[]>(initialValues?.fields ?? [])
  const [showAddField, setShowAddField] = useState(false)
  const [nameError, setNameError] = useState('')

  // ─── Predefined field handlers ────────────────────────────────────────────
  const handlePredefinedToggle = (id: string, checked: boolean) =>
    setPredefinedRows((prev) => prev.map((r) => (r.id === id ? { ...r, checked } : r)))

  const handlePredefinedToggleAll = (checked: boolean) =>
    setPredefinedRows((prev) => prev.map((r) => ({ ...r, checked })))

  // ─── Added field handlers ─────────────────────────────────────────────────
  const handleAddField = (field: DocumentField) => {
    setFields((prev) => [...prev, field])
    setShowAddField(false)
  }

  const handleSaveEditField = (updated: DocumentField) =>
    setFields((prev) => prev.map((f) => (f.id === updated.id ? updated : f)))

  const handleDuplicateField = (field: DocumentField) =>
    setFields((prev) => [
      ...prev,
      { ...field, id: generateId(), label_name: `${field.label_name} - Copy` },
    ])

  const handleDeleteField = (id: string) =>
    setFields((prev) => prev.filter((f) => f.id !== id))

  // ─── Validation + submit ──────────────────────────────────────────────────
  const validate = () => {
    if (!documentTypeName.trim()) {
      setNameError('Document type name is required')
      return false
    }
    return true
  }

  const buildFormValues = (): DocumentTypeFormValues => ({
    ...(initialValues?.id !== undefined && { id: initialValues.id }),
    document_type: documentTypeName.trim(),
    is_document_sensitive: isSensitive,
    is_required_document_approval: requiresApproval,
    predefined_fields: {
      expiry_date: predefinedRows.find((r) => r.id === 'expiry_date')?.checked ?? false,
      document_date: predefinedRows.find((r) => r.id === 'document_date')?.checked ?? false,
    },
    fields,
  })

  return {
    // state
    documentTypeName,
    isSensitive,
    requiresApproval,
    predefinedRows,
    fields,
    showAddField,
    nameError,
    totalAddedFields: fields.length,
    // setters
    setDocumentTypeName: (val: string) => {
      setDocumentTypeName(val)
      if (val.trim()) setNameError('')
    },
    setIsSensitive,
    setRequiresApproval,
    setPredefinedRows,
    setFields,
    setShowAddField,
    // handlers
    handlePredefinedToggle,
    handlePredefinedToggleAll,
    handleAddField,
    handleSaveEditField,
    handleDuplicateField,
    handleDeleteField,
    validate,
    buildFormValues,
  }
}
