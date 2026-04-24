'use client'
import { CopyIcon } from '@/assets/icons/CopyIcon'
import { EditIcon } from '@/assets/icons/EditIcon'
import { DeleteIcon } from '@/assets/icons/DeleteIcon'
import type { DocumentField } from '@/types/documentType.types'
import styles from '../fieldsTable/FieldsTable.module.scss'
import type { FieldsTableRow } from '../fieldsTable/FieldsTable'
import {
  ADDED_FIELDS_TABLE_CONFIG,
  type RowAction,
} from '../fieldsTable/fieldsTable.config'
import FieldsTable from '../fieldsTable/FieldsTable'

interface AddedFieldsTableProps {
  fields: DocumentField[]
  onReorder: (fields: DocumentField[]) => void
  onEdit: (field: DocumentField) => void
  onDuplicate: (field: DocumentField) => void
  onDelete: (id: string) => void
  onSaveEdit: (field: DocumentField) => void
}

// ─── Map DocumentField → FieldsTableRow ───────────────────────────────────────
const toTableRow = (f: DocumentField): FieldsTableRow => ({
  id: f.id,
  label: f.label_name,
  placeholder: f.placeholder_text,
  field_type: f.field_type,
  checked: f.is_required,
  _raw: f,
})

const AddedFieldsTable = ({
  fields,
  onReorder,
  onEdit,
  onDuplicate,
  onDelete,
  onSaveEdit,
}: AddedFieldsTableProps) => {
  if (fields.length === 0) return null

  // ── Build actions from props so FieldsTable stays prop-driven ────────────────
  const actions: RowAction[] = [
    {
      icon: <CopyIcon />,
      title: 'Duplicate',
      className: styles.actionBtn,
      onClick: (f) => onDuplicate(f),
    },
    {
      icon: <EditIcon />,
      title: 'Edit',
      className: styles.EditBtn,
      onClick: (f) => onEdit(f), 
    },
    {
      icon: <DeleteIcon />,
      title: 'Delete',
      className: `${styles.actionBtn} ${styles.deleteBtn}`,
      onClick: (f) => onDelete(f.id),
    },
  ]



  return (
    <FieldsTable
      config={ADDED_FIELDS_TABLE_CONFIG}
      rows={fields.map(toTableRow)}
      onReorder={(tableRows) =>
        // Map back to DocumentField[] before calling parent
        onReorder(tableRows.map((tr) => tr._raw!))
      }
      actions={actions}
      onSaveEdit={onSaveEdit}
    />
  )
}

export default AddedFieldsTable
