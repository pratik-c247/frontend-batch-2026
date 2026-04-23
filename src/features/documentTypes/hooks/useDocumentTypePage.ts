import type { FilterFormValues } from '@/types/documentType.types'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

interface SearchFormValues {
  search: string
}
export const useDocumentTypePage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterFormValues | null>(
    null,
  )
  const [hasActiveFilter, setHasActiveFilter] = useState(false)
  const filterAnchorRef = useRef<HTMLDivElement>(null)

  const { register, watch } = useForm<SearchFormValues>({
    defaultValues: { search: '' },
  })
  const searchTerm = watch('search')

  const handleAddDocumentType = () => {
    alert('Add Document Type clicked!') // will work in next pr
  }

  const handleFilter = (values: FilterFormValues) => {
    setActiveFilter(values)
    setHasActiveFilter(!!(values.startDate || values.endDate))
  }

  const handleReset = () => {
    setActiveFilter(null)
    setHasActiveFilter(false)
  }

  return {
    state: {
      isFilterOpen,
      setIsFilterOpen,
      hasActiveFilter,
      activeFilter,
    },
    handlers: {
      handleAddDocumentType,
      handleReset,
      handleFilter,
    },
    register,
    filterAnchorRef,
    searchTerm,
  }
}
