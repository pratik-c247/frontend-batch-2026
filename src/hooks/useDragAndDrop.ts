import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable as useDndSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// ─── useDragAndDrop ───────────────────────────────────────────────────────────
// Manages sensor setup and reorder logic for a DndContext.
// Usage:
//   const { sensors, handleDragEnd } = useDragAndDrop(items, setItems)

export function useDragAndDrop<T extends { id: string | number }>(
  items: T[],
  onReorder: (reordered: T[]) => void,
) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    const from = items.findIndex((i) => String(i.id) === String(active.id))
    const to = items.findIndex((i) => String(i.id) === String(over.id))
    if (from !== -1 && to !== -1) onReorder(arrayMove(items, from, to))
  }

  return { sensors, handleDragEnd }
}

// ─── useSortableRow ───────────────────────────────────────────────────────────
// Thin wrapper around @dnd-kit/sortable's useSortable for individual rows.
// Usage:
//   const { attributes, listeners, setNodeRef, style, isDragging } = useSortableRow(id)

export function useSortableRow(id: string | number) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useDndSortable({ id: String(id) })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 1 : 'auto',
  }

  return { attributes, listeners, setNodeRef, style, isDragging }
}
