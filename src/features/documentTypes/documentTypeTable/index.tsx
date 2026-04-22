'use client'
import styles from './DocumentTypeTable.module.scss'
import type { DocumentTypeTableProps } from '@/types/documentType.types'
import SortIcon from '@/assets/icons/SortIcon'
import { EditIcon } from '@/assets/icons/EditIcon'
import { DeleteIcon } from '@/assets/icons/DeleteIcon'
import { CopyIcon } from '@/assets/icons/CopyIcon'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import { formatDate } from '@/utils/dateFormater'
import { useDocumentTypeTable } from '../hooks/useDocumentTypeTable'

const DocumentTypeTable = ({
  data,
  searchTerm,
  filterValues,
  onView,
  onEdit,
  onDelete,
}: DocumentTypeTableProps) => {
  const { processedData, handleSortToggle, sortOrder } = useDocumentTypeTable({
    data,
    searchTerm,
    filterValues,
  })

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thDocType}>Document Type</th>
            <th className={styles.thFields}>Added Fields</th>
            <th className={styles.thUpdated}>
              <button
                type={BUTTON_TYPES.BUTTON}
                className={`${styles.sortBtn} ${sortOrder !== 'none' ? styles.sortActive : ''}`}
                onClick={handleSortToggle}
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
                      variant={VARIANT.ICON}
                      type={BUTTON_TYPES.BUTTON}
                      className={styles.actionBtn}
                      onClick={() => onView(item)}
                    >
                      <CopyIcon />
                    </Button>

                    <Button
                      variant={VARIANT.ICON}
                      type={BUTTON_TYPES.BUTTON}
                      className={styles.EditBtn}
                      onClick={() => onEdit(item)}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant={VARIANT.ICON}
                      type={BUTTON_TYPES.BUTTON}
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => onDelete(item)}
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
