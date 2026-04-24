'use client'
import { useState } from 'react'
import styles from './FieldsTable.module.scss'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import { DragHandleIcon } from '@/assets/icons/DragHandleIcon'
import { useDragAndDrop, useSortableRow } from '@/hooks/useDragAndDrop'
import { FIELD_TYPE_OPTIONS } from '@/data/fieldTypeOptions'
import type { DocumentField } from '@/types/documentType.types'
import type { FieldsTableConfig, RowAction } from './fieldsTable.config'
import AddFieldForm from '../addFieldForm/AddFieldForm'

export interface FieldsTableRow {
  id: string
  label: string
  placeholder: string
  field_type: string

  checked?: boolean
  locked?: boolean

  _raw?: DocumentField
}

interface RowProps {
  row: FieldsTableRow
  config: FieldsTableConfig
  onToggle?: (id: string, checked: boolean) => void
  actions?: RowAction[]
  onEditClick?: () => void
}

const TableRow = ({
  row,
  config,
  onToggle,
  actions,
  onEditClick,
}: RowProps) => {
  const { attributes, listeners, setNodeRef, style } = useSortableRow(row.id)

  const isChecked = row.locked ? true : (row.checked ?? false)
  const showYes = row.locked || isChecked

  return (
    <tr ref={setNodeRef} style={style} className={styles.row}>
      <td className={styles.dragCell}>
        <span className={styles.dragHandle} {...attributes} {...listeners}>
          <DragHandleIcon />
        </span>
      </td>

      {config.showCheckbox && (
        <td className={styles.checkCell}>
          <input
            type="checkbox"
            className={`${styles.checkbox} ${row.locked ? styles.lockedCheckbox : ''}`}
            checked={isChecked}
            onChange={(e) => {
              if (row.locked) return
              onToggle?.(row.id, e.target.checked)
            }}
          />
        </td>
      )}

      <td className={styles.labelCell}>{row.label}</td>
      <td className={styles.placeholderCell}>{row.placeholder || '-'}</td>
      <td className={styles.typeCell}>
        {FIELD_TYPE_OPTIONS.find((o) => o.value === row.field_type)?.label ??
          row.field_type}
      </td>

      <td className={styles.requiredCell}>
        {config.showCheckbox ? (
          <label
            className={`${styles.toggle} ${showYes ? styles.toggleOn : styles.toggleOff}`}
          >
            <span>{showYes ? 'YES' : 'NO'}</span>
          </label>
        ) : (
          <span className={styles.requiredBadge}>
            <span className={styles.xIcon}>✕</span>
            {isChecked ? 'Yes' : 'No'}
          </span>
        )}
      </td>

      {config.showActions && (
        <td className={styles.actionsCell}>
          <div className={styles.actionGroup}>
            {actions?.map((action, i) => (
              <Button
                key={i}
                type={BUTTON_TYPES.BUTTON}
                variant={VARIANT.ICON}
                className={action.className}
                title={action.title}
                onClick={() =>
                  action.title === 'Edit'
                    ? onEditClick?.()
                    : action.onClick(row._raw!)
                }
              >
                {action.icon}
              </Button>
            ))}
          </div>
        </td>
      )}
    </tr>
  )
}

// ─── Main table ────────────────────────────────────────────────────────────────

interface FieldsTableProps {
  rows: FieldsTableRow[]
  config: FieldsTableConfig
  onReorder: (rows: FieldsTableRow[]) => void

  onToggle?: (id: string, checked: boolean) => void
  onToggleAll?: (checked: boolean) => void

  actions?: RowAction[]
  onSaveEdit?: (field: DocumentField) => void
}

const FieldsTable = ({
  rows,
  config,
  onReorder,
  onToggle,
  onToggleAll,
  actions,
  onSaveEdit,
}: FieldsTableProps) => {
  const { sensors, handleDragEnd } = useDragAndDrop(rows, onReorder)
  const [editingId, setEditingId] = useState<string | null>(null)

  const allChecked = rows.every((r) => r.locked || r.checked)

  const colSpan =
    1 + (config.showCheckbox ? 1 : 0) + 3 + 1 + (config.showActions ? 1 : 0)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={rows.map((r) => r.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thDrag} />

                {config.showCheckbox && (
                  <th className={styles.thCheck}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={allChecked}
                      onChange={(e) => onToggleAll?.(e.target.checked)}
                    />
                  </th>
                )}

                <th className={styles.thLabel}>Label Name</th>
                <th className={styles.thPlaceholder}>Placeholder Text</th>
                <th className={styles.thType}>Field Type</th>
                <th className={styles.thRequired}>Mark as Requiredddfdf</th>

                {config.showActions && (
                  <th className={styles.thActions}>Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) =>
                config.allowInlineEdit && editingId === row.id ? (
                  <tr key={row.id}>
                    <td colSpan={colSpan} className={styles.editCell}>
                      <AddFieldForm
                        initialField={row._raw}
                        onSave={(updated) => {
                          onSaveEdit?.(updated)
                          setEditingId(null)
                        }}
                        onCancel={() => setEditingId(null)}
                      />
                    </td>
                  </tr>
                ) : (
                  <TableRow
                    key={row.id}
                    row={row}
                    config={config}
                    onToggle={onToggle}
                    actions={actions}
                    onEditClick={() => setEditingId(row.id)}
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

export default FieldsTable
