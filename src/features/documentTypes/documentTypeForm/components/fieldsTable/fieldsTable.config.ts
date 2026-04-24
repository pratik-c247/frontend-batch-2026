import type { DocumentField } from '@/types/documentType.types'

// ─── What each cell in a row can render ───────────────────────────────────────

export interface RowAction {
  icon: React.ReactNode
  title: string
  className: string
  onClick: (field: DocumentField) => void
}

export interface FieldsTableConfig {
  /** Show the checkbox select column (predefined table) */
  showCheckbox: boolean
  /** Show copy/edit/delete action buttons column (added fields table) */
  showActions: boolean
  /** Allow inline edit by expanding a row (added fields table) */
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
