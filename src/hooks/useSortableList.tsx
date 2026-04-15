import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'

type UseSortableListProps<T> = {
  items: T[]
  getId: (item: T) => string
  onChange?: (items: T[]) => void
}

export function useSortableList<T>({
  items: initialItems,
  getId,
  onChange,
}: UseSortableListProps<T>) {
  const [items, setItems] = useState(initialItems)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex(i => getId(i) === active.id)
    const newIndex = items.findIndex(i => getId(i) === over.id)

    const newItems = arrayMove(items, oldIndex, newIndex)

    setItems(newItems)
    onChange?.(newItems)
  }

  return {
    items,
    DndProvider: ({ children }: { children: React.ReactNode }) => (
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map(getId)}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </DndContext>
    ),
  }
}