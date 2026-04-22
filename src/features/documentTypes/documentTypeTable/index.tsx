'use client'
import React, { useState, useMemo } from 'react'
import styles from './DocumentTypeTable.module.scss'
import type {
  DocumentTypeTableProps,
  SortOrder,
} from '@/types/documentType.types'
import SortIcon from '@/assets/icons/SortIcon'
import { EditIcon } from '@/assets/icons/EditIcon'
import { DeleteIcon } from '@/assets/icons/DeleteIcon'
import { CopyIcon } from '@/assets/icons/CopyIcon'
import { Button } from '@/comopents/common/button'

const formatDate = (isoString: string): string => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

const nextSortOrder = (current: SortOrder): SortOrder => {
  if (current === 'none') return 'asc'
  if (current === 'asc') return 'desc'
  return 'none'
}

const DocumentTypeTable: React.FC<DocumentTypeTableProps> = ({
  data,
  searchTerm,
  filterValues,
  onView,
  onEdit,
  onDelete,
}) => {
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

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thDocType}>Document Type</th>
            <th className={styles.thFields}>Added Fields</th>
            <th className={styles.thUpdated}>
              <button
                type="button"
                className={`${styles.sortBtn} ${sortOrder !== 'none' ? styles.sortActive : ''}`}
                onClick={handleSortToggle}
                aria-label={`Sort by Last Updated – currently ${sortOrder}`}
              >
                Last Updated
                <span className={styles.sortIconWrap}>
                  <SortIcon order={sortOrder} />
                </span>
              </button>
            </th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {processedData.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.emptyCell}>
                No document types found.
              </td>
            </tr>
          ) : (
            processedData.map((item, idx) => (
              <tr
                key={item.id}
                className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                <td className={styles.tdDocType}>{item.document_type}</td>
                <td className={styles.tdFields}>{item.fields_count}</td>
                <td className={styles.tdUpdated}>
                  {formatDate(item.updated_at)}
                </td>
                <td className={styles.tdActions}>
                  <div className={styles.actionGroup}>

                    <Button
                      variant="icon"
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => onView(item)}
                      title="View"
                      aria-label={`View ${item.document_type}`}
                    >
                      <CopyIcon />
                    </Button>


                    <Button
                      variant="icon"
                      type="button"
                      className={styles.EditBtn}
                      onClick={() => onEdit(item)}
                      title="Edit"
                      aria-label={`Edit ${item.document_type}`}
                    >
                      <EditIcon />
                    </Button>

                    {/* Delete */}
                    <Button
                      variant="icon"
                      type="button"
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => onDelete(item)}
                      title="Delete"
                      aria-label={`Delete ${item.document_type}`}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DocumentTypeTable
