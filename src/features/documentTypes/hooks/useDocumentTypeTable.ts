import type {
  DocumentTypeTableProps,
  SortOrder,
} from '@/types/documentType.types'
import { useMemo, useState } from 'react'
export const nextSortOrder = (current: SortOrder): SortOrder => {
  if (current === 'none') return 'asc'
  if (current === 'asc') return 'desc'
  return 'none'
}

export const useDocumentTypeTable = ({
  data,
  searchTerm,
  filterValues,
}: Pick<DocumentTypeTableProps, 'data' | 'searchTerm' | 'filterValues'>) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('none')
  const processedData = useMemo(() => {
    let result = [...data]

    // 1. Search filter (document_type only)
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase()
      result = result.filter((item) =>
        item.document_type.toLowerCase().includes(lower),
      )
    }

    // 2. Date range filter
    if (filterValues) {
      const { startDate, endDate } = filterValues
      if (startDate) {
        result = result.filter(
          (item) => new Date(item.updated_at) >= new Date(startDate),
        )
      }
      if (endDate) {
        // Include the entire end day
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        result = result.filter((item) => new Date(item.updated_at) <= end)
      }
    }

    // 3. Sort by updated_at
    if (sortOrder !== 'none') {
      result.sort((a, b) => {
        const diff =
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        return sortOrder === 'asc' ? diff : -diff
      })
    }

    return result
  }, [data, searchTerm, filterValues, sortOrder])

  const handleSortToggle = () => {
    setSortOrder((prev) => nextSortOrder(prev))
  }
  return { processedData, handleSortToggle, sortOrder }
}
