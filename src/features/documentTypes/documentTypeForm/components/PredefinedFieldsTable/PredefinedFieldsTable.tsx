'use client'
import styles from './PredefinedFieldsTable.module.scss'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DragHandleIcon } from '@/assets/icons/DragHandleIcon'
import { useDragAndDrop, useSortableRow } from '@/hooks/useDragAndDrop'

interface PredefinedRow {
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

// ─── Individual sortable row ───────────────────────────────────────────────────
const PredefinedRow = ({
  row,
  onToggle,
}: {
  row: PredefinedRow
  onToggle: (id: string, checked: boolean) => void
}) => {
  const { attributes, listeners, setNodeRef, style } = useSortableRow(row.id)

  return (
    <tr ref={setNodeRef} style={style} className={styles.row}>
      <td className={styles.dragCell}>
        <span className={styles.dragHandle} {...attributes} {...listeners}>
          <DragHandleIcon />

        </span>
      </td>
      <td className={styles.checkCell}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={row.checked}
          onChange={(e) => onToggle(row.id, e.target.checked)}
        />
      </td>
      <td className={styles.labelCell}>{row.label}</td>
      <td className={styles.placeholderCell}>{row.placeholder}</td>
      <td className={styles.typeCell}>{row.field_type}</td>
      <td className={styles.requiredCell}>
        <div className={styles.toggleWrap}>
          <label className={`${styles.toggle} ${row.checked ? styles.toggleOn : styles.toggleOff}`}>
            <span>{row.checked ? 'YES' : 'NO'}</span>
          </label>
        </div>
      </td>
    </tr>
  )
}


const PredefinedFieldsTable = ({
  rows,
  onReorder,
  onToggle,
  onToggleAll,
}: PredefinedFieldsTableProps) => {
  const { sensors, handleDragEnd } = useDragAndDrop(rows, onReorder)
  const allChecked = rows.every((r) => r.checked)

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thDrag} />
                <th className={styles.thCheck}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={allChecked}
                    onChange={(e) => onToggleAll(e.target.checked)}
                  />
                </th>
                <th className={styles.thLabel}>Label Name</th>
                <th className={styles.thPlaceholder}>Placeholder Text</th>
                <th className={styles.thType}>Field Type</th>
                <th className={styles.thRequired}>Mark as Required</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <PredefinedRow key={row.id} row={row} onToggle={onToggle} />
              ))}
            </tbody>
          </table>
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default PredefinedFieldsTable
