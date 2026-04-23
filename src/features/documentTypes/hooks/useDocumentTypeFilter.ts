import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { EVENT_LISTENERS } from '@/constants/eventListeners'
import type {
  DocumentTypeFilterProps,
  FilterFormValues,
} from '@/types/documentType.types'

export const useDocumentTypeFilter = ({
  onClose,
  onFilter,
  onReset,
  isOpen,
}: DocumentTypeFilterProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FilterFormValues>({
    defaultValues: {
      startDate: '',
      endDate: '',
    },
  })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener(EVENT_LISTENERS.MOUSE_DOWN, handler)
    }
    return () =>
      document.removeEventListener(EVENT_LISTENERS.MOUSE_DOWN, handler)
  }, [isOpen, onClose])

  const handleReset = () => {
    reset({ startDate: '', endDate: '' })
    onReset()
  }

  const onSubmit = (values: FilterFormValues) => {
    onFilter(values)
    onClose()
  }

  return {
    handleSubmit,
    control,
    getValues,
    errors,
    handleReset,
    onSubmit,
    panelRef,
  }
}
