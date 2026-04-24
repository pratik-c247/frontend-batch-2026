import { useState, useEffect } from 'react'

interface useOptionsModalProps {
  initialOptions?: string[]
  onSave: (options: string[]) => void
}

export const useOptionsModal = ({
  initialOptions = [],
  onSave,
}: useOptionsModalProps) => {
  const [options, setOptions] = useState<string[]>(
    initialOptions.length ? initialOptions : ['', '', '', ''],
  )

  useEffect(() => {
    if (initialOptions.length) setOptions([...initialOptions])
  }, [])

  const isEditing = initialOptions.length > 0

  const handleChange = (index: number, value: string) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? value : o)))
  }

  const handleAdd = () => setOptions((prev) => [...prev, ''])

  const handleDelete = (index: number) => {
    setOptions((prev) => {
      if (prev.length === 1) {
        alert('Can Not Delete, At Least One Option Required')
        return prev
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  const duplicateIndexes = options.reduce<Set<number>>((acc, val, i) => {
    if (val && options.indexOf(val) !== i) acc.add(i)
    return acc
  }, new Set())

  const hasError = duplicateIndexes.size > 0
  const filledCount = options.filter(Boolean).length

  const handleSave = () => {
    if (hasError) return
    onSave(options.filter(Boolean))
  }

  return {
    handler: {
      handleSave,
      handleDelete,
      handleAdd,
      handleChange,
    },
    filledCount,
    isEditing,
    options,
    duplicateIndexes,
    hasError,
  }
}
