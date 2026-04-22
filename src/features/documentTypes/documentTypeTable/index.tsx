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
import { GLOBAL_CONST } from '@/constants/global.const'
import { DOCUMENT_TYPES_CONST } from '../documentType.const'
import Pagination from '@/comopents/common/pagination'

const DocumentTypeTable = ({
  data,
  searchTerm,
  filterValues,
  onView,
  onEdit,
  onDelete,
}: DocumentTypeTableProps) => {
  const {
    processedData,
    handleSortToggle,
    sortOrder,
    page,
    setPage,
    perPage,
    setPerPage,
  } = useDocumentTypeTable({
    data,
    searchTerm,
    filterValues,
  })
  const actionButtons = [
    {
      icon: <CopyIcon />,
      className: styles.actionBtn,
      handler: onView,
    },
    {
      icon: <EditIcon />,
      className: styles.EditBtn,
      handler: onEdit,
    },
    {
      icon: <DeleteIcon />,
      className: `${styles.actionBtn} ${styles.deleteBtn}`,
      handler: onDelete,
    },
  ]

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thDocType}>
              {DOCUMENT_TYPES_CONST.DOCUMENT_TYPE}
            </th>
            <th className={styles.thFields}>
              {DOCUMENT_TYPES_CONST.ADDED_FIELDS}
            </th>
            <th className={styles.thUpdated}>
              <button
                type={BUTTON_TYPES.BUTTON}
                className={`${styles.sortBtn} ${sortOrder !== 'none' ? styles.sortActive : ''}`}
                onClick={handleSortToggle}
              >
                {DOCUMENT_TYPES_CONST.LAST_UPDATED}
                <span className={styles.sortIconWrap}>
                  <SortIcon order={sortOrder} />
                </span>
              </button>
            </th>
            <th className={styles.thActions}>{DOCUMENT_TYPES_CONST.ACTIONS}</th>
          </tr>
        </thead>

        <tbody>
          {processedData.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.emptyCell}>
                {GLOBAL_CONST.NO_DOCUMENT_TYPE_FOUND}
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
                    {actionButtons.map((action, idx) => (
                      <Button
                        key={idx}
                        variant={VARIANT.ICON}
                        type={BUTTON_TYPES.BUTTON}
                        className={action.className}
                        onClick={() => action.handler(item)}
                      >
                        {action.icon}
                      </Button>
                    ))}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
     
      <Pagination
        total={processedData.length}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
        onPerPageChange={(val) => {
          setPerPage(val)
          setPage(1)
        }}
      />
    </div>
  )
}

export default DocumentTypeTable
