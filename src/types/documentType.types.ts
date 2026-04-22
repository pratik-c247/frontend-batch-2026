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
  name: string
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
