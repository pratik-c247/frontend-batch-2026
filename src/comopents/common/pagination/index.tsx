'use client'
import styles from './Pagination.module.scss'
import { BUTTON_TYPES } from '@/constants/button.const'
import { ChevronLeftIcon } from '@/assets/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@/assets/icons/ChevronRightIcon'
import { Button } from '../button'
import { usePagination } from '@/hooks/usePagination'
import type { PaginationProps } from '@/types/global.types'

const Pagination = ({
  total,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = [10, 25, 50, 100],
}: PaginationProps) => {
  const {
    handlers: {
      handlePerPageChange,
      handleNext,
      handlePrev,
      handleGoToBlur,
      handleGoToPage,
    },
    state: { goToValue, setGoToValue },
    rangeStart,
    rangeEnd,
    totalPages,
  } = usePagination({
    total,
    page,
    perPage,
    onPageChange,
    onPerPageChange,
  })

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.paginationInner}>
        <div className={styles.goToPage}>
          <span className={styles.label}>Go to page</span>
          <input
            type={BUTTON_TYPES.NUMBER}
            min={1}
            max={totalPages}
            value={goToValue}
            onChange={(e) => setGoToValue(e.target.value)}
            onKeyDown={handleGoToPage}
            onBlur={handleGoToBlur}
            className={styles.pageInput}
          />
        </div>

        <div className={styles.perPage}>
          <span className={styles.label}>Per page</span>
          <div className={styles.selectWrapper}>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className={styles.perPageSelect}
            >
              {perPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className={styles.rangeText}>
          {rangeStart} - {rangeEnd} of {total}
        </span>

        <div className={styles.navButtons}>
          <Button
            type={BUTTON_TYPES.BUTTON}
            className={`${styles.navBtn} ${page <= 1 ? styles.navBtnDisabled : ''}`}
            onClick={handlePrev}
            disabled={page <= 1}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            type={BUTTON_TYPES.BUTTON}
            className={`${styles.navBtn} ${page >= totalPages ? styles.navBtnDisabled : ''}`}
            onClick={handleNext}
            disabled={page >= totalPages}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
