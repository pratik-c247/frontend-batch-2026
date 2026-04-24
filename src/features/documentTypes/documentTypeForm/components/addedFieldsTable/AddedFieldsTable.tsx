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

const toTableRow = (field: DocumentField): FieldsTableRow => ({
  id: field.id,
  label: field.label_name,
  placeholder: field.placeholder_text,
  field_type: field.field_type,
  checked: field.is_required,
  _raw: field,
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
      onReorder={(tableRows) => onReorder(tableRows.map((tr) => tr._raw!))}
      actions={actions}
      onSaveEdit={onSaveEdit}
    />
  )
}

export default AddedFieldsTable
