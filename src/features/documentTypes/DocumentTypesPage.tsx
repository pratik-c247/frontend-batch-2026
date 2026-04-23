'use client'
import styles from './DocumentTypeMainPage.module.scss'
import SectionWrapper from '@/comopents/common/sectionWrapper'
import DocumentTypeFilter from '@/features/documentTypes/documentTypeFilter'
import DocumentTypeTable from './documentTypeTable'
import { documentTypeData } from '@/data/documentType'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { FilterIcon } from '@/assets/icons/FilterIcon'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import { useDocumentTypePage } from './hooks/useDocumentTypePage'
import { INPUT_TYPES, PLACEHOLDERS, REGISTER } from '@/constants/input.const'
import { DOCUMENT_TYPES_CONST } from './documentType.const'

const DocumentTypesPage = () => {
  const {
    state: { isFilterOpen, setIsFilterOpen, hasActiveFilter, activeFilter },
    handlers: { handleAddDocumentType, handleReset, handleFilter },
    register,
    filterAnchorRef,
    searchTerm,
  } = useDocumentTypePage()

  return (
    <div className={styles.pageRoot}>
      <SectionWrapper
        title={DOCUMENT_TYPES_CONST.SECTION_TITLE}
        buttonLabel={DOCUMENT_TYPES_CONST.SECTION_LABEL}
        onButtonClick={handleAddDocumentType}
      >
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              {...register(REGISTER.SEARCH)}
              type={INPUT_TYPES.TEXT}
              className={styles.searchInput}
              placeholder={PLACEHOLDERS.SEARCH_BY_DOCUMENT_TYPE}
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
          onView={(item) => console.log('View:', item)} // will work in next pr
          onEdit={(item) => console.log('Edit:', item)} // will work in next pr
          onDelete={(item) => console.log('Delete:', item)} // will work in next pr
        />
      </SectionWrapper>
    </div>
  )
}

export default DocumentTypesPage
