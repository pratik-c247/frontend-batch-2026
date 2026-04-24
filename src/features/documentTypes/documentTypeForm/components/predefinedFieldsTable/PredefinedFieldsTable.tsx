'use client'
import type { FieldsTableRow } from '../fieldsTable/FieldsTable'
import FieldsTable from '../fieldsTable/FieldsTable'
import { PREDEFINED_TABLE_CONFIG } from '../fieldsTable/fieldsTable.config'
export interface PredefinedRow {
  id: string
  label: string
  placeholder: string
  field_type: string
  checked: boolean
}

interface PredefinedFieldsTableProps {
  rows: PredefinedRow[]
  onReorder: (rows: PredefinedRow[]) => void
  onToggle: (id: string, checked: boolean) => void
  onToggleAll: (checked: boolean) => void
}

const toTableRow = (r: PredefinedRow): FieldsTableRow => ({
  id: r.id,
  label: r.label,
  placeholder: r.placeholder,
  field_type: r.field_type,
  checked: r.checked,
  locked: r.label === 'Document Date',
})

const PredefinedFieldsTable = ({
  rows,
  onReorder,
  onToggle,
  onToggleAll,
}: PredefinedFieldsTableProps) => (
  <FieldsTable
    config={PREDEFINED_TABLE_CONFIG}
    rows={rows.map(toTableRow)}
    onReorder={(tableRows) =>
      onReorder(
        tableRows.map((tr) => ({
          id: tr.id,
          label: tr.label,
          placeholder: tr.placeholder,
          field_type: tr.field_type,
          checked: tr.checked ?? false,
        })),
      )
    }
    onToggle={onToggle}
    onToggleAll={onToggleAll}
  />
)

export default PredefinedFieldsTable
