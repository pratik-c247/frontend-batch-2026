'use client'
import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import styles from './DocumentTypeMainPage.module.scss'
import type { FilterFormValues } from '@/types/documentType.types'
import SectionWrapper from '@/comopents/common/sectionWrapper'
import DocumentTypeFilter from '@/comopents/common/documentTypeFilter'
import DocumentTypeTable from './documentTypeTable'
import { documentTypeData } from '@/data/documentType'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { FilterIcon } from '@/assets/icons/FilterIcon'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'

interface SearchFormValues {
  search: string
}

const DocumentTypesPage: React.FC = () => {
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
    alert('Add Document Type clicked!')
  }

  const handleFilter = (values: FilterFormValues) => {
    setActiveFilter(values)
    setHasActiveFilter(!!(values.startDate || values.endDate))
  }

  const handleReset = () => {
    setActiveFilter(null)
    setHasActiveFilter(false)
  }

  return (
    <div className={styles.pageRoot}>
      <SectionWrapper
        title="Document Types - Trucks"
        buttonLabel="Add Document Type"
        onButtonClick={handleAddDocumentType}
      >
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              {...register('search')}
              type="text"
              className={styles.searchInput}
              placeholder="Search by Document Type..."
              autoComplete="off"
            />
          </div>

          <div ref={filterAnchorRef} className={styles.filterAnchor}>
            <Button
              type={BUTTON_TYPES.BUTTON}
              variant={VARIANT.SECONDARY}
              className={`${styles.filterBtn} ${hasActiveFilter ? styles.filterActive : ''}`}
              onClick={() => setIsFilterOpen((prev) => !prev)}
              aria-expanded={isFilterOpen}
              aria-haspopup="dialog"
            >
              <FilterIcon />
              Filters
              {hasActiveFilter && <span className={styles.filterDot} />}
            </Button>

            <DocumentTypeFilter
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onFilter={handleFilter}
              onReset={handleReset}
            />
          </div>
        </div>

        <DocumentTypeTable
          data={documentTypeData}
          searchTerm={searchTerm}
          filterValues={activeFilter}
          onView={(item) => console.log('View:', item)}
          onEdit={(item) => console.log('Edit:', item)}
          onDelete={(item) => console.log('Delete:', item)}
        />
      </SectionWrapper>
    </div>
  )
}

export default DocumentTypesPage
