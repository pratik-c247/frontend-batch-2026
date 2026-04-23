import type { PaginationProps } from '@/types/global.types'
import React, { useState } from 'react'
export const usePagination = ({
  total,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
}: Omit<PaginationProps, 'perPageOptions'>) => {
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
  return {
    handlers: {
      handlePerPageChange,
      handleNext,
      handlePrev,
      handleGoToBlur,
      handleGoToPage,
    },
    state: {
      goToValue,
      setGoToValue,
    },
    rangeStart,
    rangeEnd,
    totalPages,
  }
}
