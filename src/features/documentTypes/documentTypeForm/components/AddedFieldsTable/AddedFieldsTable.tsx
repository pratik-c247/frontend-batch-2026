'use client'
import { useState } from 'react'
import styles from './AddedFieldsTable.module.scss'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import { EditIcon } from '@/assets/icons/EditIcon'
import { DeleteIcon } from '@/assets/icons/DeleteIcon'
import { CopyIcon } from '@/assets/icons/CopyIcon'
import { DragHandleIcon } from '@/assets/icons/DragHandleIcon'
import type { DocumentField } from '@/types/documentType.types'
import AddFieldForm from '../AddFieldForm/AddFieldForm'
import { useDragAndDrop, useSortableRow } from '@/hooks/useDragAndDrop'
import { FIELD_TYPE_OPTIONS } from '@/data/fieldTypeOptions'

interface AddedFieldsTableProps {
  fields: DocumentField[]
  onReorder: (fields: DocumentField[]) => void
  onEdit: (field: DocumentField) => void
  onDuplicate: (field: DocumentField) => void
  onDelete: (id: string) => void
  onSaveEdit: (field: DocumentField) => void
}

const FieldRow = ({
  field,
  onEdit,
  onDuplicate,
  onDelete,
}: {
  field: DocumentField
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
}) => {
  const { attributes, listeners, setNodeRef, style } = useSortableRow(field.id)
  const typeLabel =
    FIELD_TYPE_OPTIONS.find((o) => o.value === field.field_type)?.label ??
    field.field_type

  return (
    <tr ref={setNodeRef} style={style} className={styles.row}>
      <td className={styles.dragCell}>
        <span className={styles.dragHandle} {...attributes} {...listeners}>
          <DragHandleIcon />
        </span>
      </td>
      <td className={styles.labelCell}>{field.label_name}</td>
      <td className={styles.placeholderCell}>
        {field.placeholder_text || '-'}
      </td>
      <td className={styles.typeCell}>{typeLabel}</td>
      <td className={styles.requiredCell}>
        <span
          className={`${styles.requiredBadge} ${field.is_required ? styles.no : styles.no}`}
        >
          {field.is_required ? (
            <span className={styles.xIcon}>✕</span>
          ) : (
            <span className={styles.xIcon}>✕</span>
          )}
          {field.is_required ? 'Yes' : 'No'}
        </span>
      </td>
      <td className={styles.actionsCell}>
        <div className={styles.actionGroup}>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={VARIANT.ICON}
            className={styles.actionBtn}
            onClick={onDuplicate}
            title="Duplicate"
          >
            <CopyIcon />
          </Button>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={VARIANT.ICON}
            className={styles.editBtn}
            onClick={onEdit}
            title="Edit"
          >
            <EditIcon />
          </Button>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={VARIANT.ICON}
            className={styles.deleteBtn}
            onClick={onDelete}
            title="Delete"
          >
            <DeleteIcon />
          </Button>
        </div>
      </td>
    </tr>
  )
}
const AddedFieldsTable = ({
  fields,
  onReorder,
  onEdit,
  onDuplicate,
  onDelete,
  onSaveEdit,
}: AddedFieldsTableProps) => {
  const { sensors, handleDragEnd } = useDragAndDrop(fields, onReorder)
  const [editingId, setEditingId] = useState<string | null>(null)

  if (fields.length === 0) return null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thDrag} />
                <th className={styles.thLabel}>Label Name</th>
                <th className={styles.thPlaceholder}>Placeholder Text</th>
                <th className={styles.thType}>Field Type</th>
                <th className={styles.thRequired}>Mark as Required</th>
                <th className={styles.thActions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) =>
                editingId === field.id ? (
                  <tr key={field.id}>
                    <td colSpan={6} className={styles.editCell}>
                      <AddFieldForm
                        initialField={field}
                        onSave={(updated) => {
                          onSaveEdit(updated)
                          setEditingId(null)
                        }}
                        onCancel={() => setEditingId(null)}
                      />
                    </td>
                  </tr>
                ) : (
                  <FieldRow
                    key={field.id}
                    field={field}
                    onEdit={() => {
                      onEdit(field)
                      setEditingId(field.id)
                    }}
                    onDuplicate={() => onDuplicate(field)}
                    onDelete={() => onDelete(field.id)}
                  />
                ),
              )}
            </tbody>
          </table>
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default AddedFieldsTable
