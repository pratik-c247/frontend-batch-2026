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
import type { DocumentTypeRecord, DocumentTypeFormValues, FilterValues } from '@/types/documentType.types'

type FormMode = 'add' | 'edit'

const seedInitialData = async (): Promise<DocumentTypeRecord[]> => {
  const existing = await getAllDocumentTypes()
  if (existing.length > 0) return existing

  // Seed static data into IndexDB on first load
  for (const item of documentTypeData) {
    await addDocumentType({
      document_type: item.document_type,
      is_document_sensitive: item.is_document_sensitive === 1,
      is_required_document_approval: item.is_required_document_approval === 1,
      predefined_fields: { expiry_date: false, document_date: false },
      fields: [],
    })
  }
  return getAllDocumentTypes()
}

export const useDocumentTypePage = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentTypeRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Form modal
  const [formMode, setFormMode] = useState<FormMode>('add')
  const [formOpen, setFormOpen] = useState(false)
  const [editingValues, setEditingValues] = useState<DocumentTypeFormValues | undefined>()

  // Filter
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterValues>({})
  const hasActiveFilter = Object.values(activeFilter).some(Boolean)
  const filterAnchorRef = useRef<HTMLDivElement>(null)

  const { register, watch } = useForm({ defaultValues: { search: '' } })
  const searchTerm = watch('search')

  // ─── Load ─────────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await seedInitialData()
      // Show newest first
      setDocumentTypes([...data].sort((a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      ))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

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
      is_document_sensitive: item.is_document_sensitive === 1 || item.is_document_sensitive === true,
      is_required_document_approval: item.is_required_document_approval === 1 || item.is_required_document_approval === true,
      predefined_fields: item.predefined_fields ?? { expiry_date: false, document_date: false },
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
      await updateDocumentType(values as DocumentTypeFormValues & { id: number })
    } else {
      await addDocumentType(values)
    }
    setFormOpen(false)
    loadData()
  }

  const handleFilter = (values: FilterValues) => {
    setActiveFilter(values)
    setIsFilterOpen(false)
  }

  const handleReset = () => {
    setActiveFilter({})
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
