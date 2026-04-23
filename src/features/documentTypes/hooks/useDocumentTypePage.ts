// import type { FilterFormValues } from '@/types/documentType.types'
// import { useState, useRef } from 'react'
// import { useForm } from 'react-hook-form'

// interface SearchFormValues {
//   search: string
// }
// export const useDocumentTypePage = () => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false)
//   const [activeFilter, setActiveFilter] = useState<FilterFormValues | null>(
//     null,
//   )
//   const [hasActiveFilter, setHasActiveFilter] = useState(false)
//   const filterAnchorRef = useRef<HTMLDivElement>(null)

//   const { register, watch } = useForm<SearchFormValues>({
//     defaultValues: { search: '' },
//   })
//   const searchTerm = watch('search')

//   const handleAddDocumentType = () => {
//     alert('Add Document Type clicked!') // will work in next pr
//   }

//   const handleFilter = (values: FilterFormValues) => {
//     setActiveFilter(values)
//     setHasActiveFilter(!!(values.startDate || values.endDate))
//   }

//   const handleReset = () => {
//     setActiveFilter(null)
//     setHasActiveFilter(false)
//   }

//   return {
//     state: {
//       isFilterOpen,
//       setIsFilterOpen,
//       hasActiveFilter,
//       activeFilter,
//     },
//     handlers: {
//       handleAddDocumentType,
//       handleReset,
//       handleFilter,
//     },
//     register,
//     filterAnchorRef,
//     searchTerm,
//   }
// }

////////////////////////////////////////////////////////////
import { useState, useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {
  getAllDocumentTypes,
  addDocumentType,
  updateDocumentType,
  deleteDocumentType,
  duplicateDocumentType,
} from '@/utils/indexDB/documentTypeDB'
import { documentTypeData } from '@/data/documentType'
import type {
  DocumentTypeRecord,
  DocumentTypeFormValues,
  FilterFormValues,
} from '@/types/documentType.types'

type FormMode = 'add' | 'edit'

const seedInitialData = async (): Promise<DocumentTypeRecord[]> => {
  const existing = await getAllDocumentTypes()
  if (existing.length > 0) return existing

  for (const item of documentTypeData) {
    console.log('data2',item)
    await addDocumentType({
      document_type: item.document_type,
      is_document_sensitive: false,
      is_required_document_approval: false,
      predefined_fields: { expiry_date: false, document_date: false },
      fields: [],
      fields_count: item.fields_count,
      updated_at:item.updated_at
    })
  }
  return getAllDocumentTypes()
}

export const useDocumentTypePage = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentTypeRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [formMode, setFormMode] = useState<FormMode>('add')
  const [formOpen, setFormOpen] = useState(false)
  const [editingValues, setEditingValues] = useState<
    DocumentTypeFormValues | undefined
  >()

  // Filter
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterFormValues | null>(
    null,
  )
  // const [activeFilter, setActiveFilter] = useState<FilterValues>({})
  // const hasActiveFilter = Object.values(activeFilter).some(Boolean)
  const [hasActiveFilter] = useState(false)

  const filterAnchorRef = useRef<HTMLDivElement>(null)

  const { register, watch } = useForm({ defaultValues: { search: '' } })
  const searchTerm = watch('search')


  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await seedInitialData()

      setDocumentTypes(
        [...data].sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleAddDocumentType = () => {
    setFormMode('add')
    setEditingValues(undefined)
    setFormOpen(true)
  }

  const handleEdit = (item: DocumentTypeRecord) => {
    setFormMode('edit')
    setEditingValues({
      id: item.id,
      document_type: item.document_type,
      is_document_sensitive: false,
      is_required_document_approval: false,

      predefined_fields: item.predefined_fields ?? {
        expiry_date: false,
        document_date: false,
      },
      fields: item.fields ?? [],
    })
    setFormOpen(true)
  }

  const handleDuplicate = async (item: DocumentTypeRecord) => {
    await duplicateDocumentType(item.id)
    loadData()
  }

  const handleDelete = async (item: DocumentTypeRecord) => {
    if (!window.confirm(`Delete "${item.document_type}"?`)) return
    await deleteDocumentType(item.id)
    loadData()
  }

  const handleFormSubmit = async (values: DocumentTypeFormValues) => {
    if (formMode === 'edit' && values.id !== undefined) {
      await updateDocumentType(
        values as DocumentTypeFormValues & { id: number },
      )
    } else {
      await addDocumentType(values)
    }
    setFormOpen(false)
    loadData()
  }

  const handleFilter = (values: FilterFormValues) => {
    setActiveFilter(values)
    setIsFilterOpen(false)
  }

  const handleReset = () => {
    setActiveFilter(null)
    setIsFilterOpen(false)
  }

  return {
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
      handleFilter,
      handleReset,
      handleFormClose: () => setFormOpen(false),
    },
    register,
    filterAnchorRef,
    searchTerm,
  }
}
