'use client'
import styles from './DocumentTypeMainPage.module.scss'
import SectionWrapper from '@/comopents/common/sectionWrapper'
import DocumentTypeFilter from '@/features/documentTypes/documentTypeFilter'
import DocumentTypeTable from './documentTypeTable'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { FilterIcon } from '@/assets/icons/FilterIcon'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import { useDocumentTypePage } from './hooks/useDocumentTypePage'
import { INPUT_TYPES, PLACEHOLDERS, REGISTER } from '@/constants/input.const'
import { DOCUMENT_TYPES_CONST } from './documentType.const'
import DocumentTypeForm from '@/features/documentTypes/documentTypeForm'

const DocumentTypesPage = () => {
  const {
    state: {
      documentTypes,
      isLoading,
      formOpen,
      formMode,
      editingValues,
      isFilterOpen,
      setIsFilterOpen,
      hasActiveFilter,
      activeFilter,
    },
    handlers: {
      handleAddDocumentType,
      handleEdit,
      handleDuplicate,
      handleDelete,
      handleFormSubmit,
      handleFormClose,
      handleFilter,
      handleReset,
    },
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
              {DOCUMENT_TYPES_CONST.FILTERS}
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

        {isLoading ? (
          <div className={styles.loadingState}>Loading...</div>
        ) : (
          <DocumentTypeTable
            data={documentTypes}
            searchTerm={searchTerm}
            filterValues={activeFilter}
            onView={(item) => handleDuplicate(item)}
            onEdit={(item) => handleEdit(item)}
            onDelete={(item) => handleDelete(item)}
          />
        )}
      </SectionWrapper>

      {/* Add / Edit modal */}
      {formOpen && (
        <DocumentTypeForm
          mode={formMode}
          initialValues={editingValues}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}

export default DocumentTypesPage
