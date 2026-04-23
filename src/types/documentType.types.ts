export interface DocumentTypeItem {
  id: number
  document_type: string
  is_document_mandatory: number
  is_document_sensitive: number
  is_sensitive_check_mandatory: number
  updated_at: string
  fields_count: number
  is_required_document_approval: number
}

export type SortOrder = 'none' | 'asc' | 'desc'

export interface FilterFormValues {
  startDate: string
  endDate: string
}

export interface SectionWrapperProps {
  title: string
  buttonLabel?: string
  onButtonClick?: () => void
  children: React.ReactNode
  className?: string
}

export interface DatePickerFieldProps {
  label: string
  name?: string
  tooltipText?: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  error?: string
}

export interface DocumentTypeFilterProps {
  isOpen: boolean
  onClose: () => void
  onFilter: (values: FilterFormValues) => void
  onReset: () => void
}

export interface DocumentTypeTableProps {
  data: DocumentTypeItem[]
  searchTerm: string
  filterValues: FilterFormValues | null
  onView: (item: DocumentTypeItem) => void
  onEdit: (item: DocumentTypeItem) => void
  onDelete: (item: DocumentTypeItem) => void
}
// ─── Existing listing types ───────────────────────────────────────────────────

export interface DocumentTypeItem {
  id: number
  document_type: string
  is_document_mandatory: number
  is_document_sensitive: number
  is_sensitive_check_mandatory: number
  updated_at: string
  fields_count: number
  is_required_document_approval: number
}

export interface DocumentTypeTableProps {
  data: DocumentTypeItem[]
  searchTerm: string
  filterValues: FilterValues
  onView: (item: DocumentTypeItem) => void
  onEdit: (item: DocumentTypeItem) => void
  onDelete: (item: DocumentTypeItem) => void
}

export interface FilterValues {
  is_document_sensitive?: string
  is_document_mandatory?: string
}

export interface DatePickerFieldProps {
  label: string
  tooltipText?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

// ─── Form types ───────────────────────────────────────────────────────────────

export interface SubField {
  id: string
  label_name: string
  field_type: string
  placeholder_text: string
  is_required: boolean
}

export interface DocumentField {
  id: string
  label_name: string
  field_type: string
  placeholder_text: string
  is_required: boolean
  /** for custom_dropdown | multi_select_dropdown | radio_button | checkbox */
  options?: string[]
  /** for toggle_switch */
  subfields?: SubField[]
  /** for checkbox – "Is this a sub-document field?" */
  is_sub_document?: boolean
}

export interface PredefinedFieldState {
  expiry_date: boolean
  document_date: boolean
}

export interface DocumentTypeFormValues {
  id?: number
  document_type: string
  is_document_sensitive: boolean
  is_required_document_approval: boolean
  predefined_fields: PredefinedFieldState
  fields: DocumentField[]
}

// ─── IndexDB stored record ────────────────────────────────────────────────────

export interface DocumentTypeRecord extends DocumentTypeFormValues {
  id: number
  updated_at: string
  fields_count: number
  is_document_mandatory: number
  is_sensitive_check_mandatory: number
}