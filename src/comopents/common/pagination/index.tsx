'use client'
import React, { useState } from 'react'
import styles from './Pagination.module.scss'
import { BUTTON_TYPES } from '@/constants/button.const'
import { ChevronLeftIcon } from '@/assets/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@/assets/icons/ChevronRightIcon'

interface PaginationProps {
  total: number
  page: number
  perPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  perPageOptions?: number[]
}

const Pagination = ({
  total,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = [10, 25, 50, 100],
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const [goToValue, setGoToValue] = useState<string>(String(page))

  const rangeStart = total === 0 ? 0 : (page - 1) * perPage + 1
  const rangeEnd = Math.min(page * perPage, total)

  const handleGoToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseInt(goToValue, 10)
      if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
        onPageChange(parsed)
      } else {
        setGoToValue(String(page))
      }
    }
  }

  const handleGoToBlur = () => {
    const parsed = parseInt(goToValue, 10)
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      onPageChange(parsed)
    } else {
      setGoToValue(String(page))
    }
  }

  const handlePrev = () => {
    if (page > 1) {
      const newPage = page - 1
      setGoToValue(String(newPage))
      onPageChange(newPage)
    }
  }

  const handleNext = () => {
    if (page < totalPages) {
      const newPage = page + 1
      setGoToValue(String(newPage))
      onPageChange(newPage)
    }
  }

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.target.value, 10)
    onPerPageChange(newPerPage)
    setGoToValue('1')
  }

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
          <button
            type={BUTTON_TYPES.BUTTON}
            className={`${styles.navBtn} ${page <= 1 ? styles.navBtnDisabled : ''}`}
            onClick={handlePrev}
            disabled={page <= 1}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type={BUTTON_TYPES.BUTTON}
            className={`${styles.navBtn} ${page >= totalPages ? styles.navBtnDisabled : ''}`}
            onClick={handleNext}
            disabled={page >= totalPages}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
