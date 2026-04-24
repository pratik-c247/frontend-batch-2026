import type { DocumentField } from '@/types/documentType.types'

export interface RowAction {
  icon: React.ReactNode
  title: string
  className: string
  onClick: (field: DocumentField) => void
}

export interface FieldsTableConfig {
  showCheckbox: boolean
  showActions: boolean

  allowInlineEdit: boolean
}

export const PREDEFINED_TABLE_CONFIG: FieldsTableConfig = {
  showCheckbox: true,
  showActions: false,
  allowInlineEdit: false,
}

export const ADDED_FIELDS_TABLE_CONFIG: FieldsTableConfig = {
  showCheckbox: false,
  showActions: true,
  allowInlineEdit: true,
}
