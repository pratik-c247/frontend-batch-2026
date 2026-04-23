'use client'
import { useState, useEffect } from 'react'
import styles from './OptionsModal.module.scss'
import FormWrapper from '@/comopents/common/formWrapper/FormWrapper'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import { DeleteIcon } from '@/assets/icons/DeleteIcon'
import { PlusIcon } from '@/assets/icons/PlusIcon'

interface OptionsModalProps {
  initialOptions?: string[]
  onSave: (options: string[]) => void
  onClose: () => void
}

const OptionsModal = ({ initialOptions = [], onSave, onClose }: OptionsModalProps) => {
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

  const handleDelete = (index: number) =>
    setOptions((prev) => prev.filter((_, i) => i !== index))

  // Validation: duplicate values
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

  return (
    <FormWrapper
      title={isEditing ? 'Edit Options' : 'Add Options'}
      onClose={onClose}
      className={styles.modal}
    >
      <div className={styles.header}>
        <span className={styles.sectionTitle}>Options List</span>
        <span className={styles.count}>Added Options : {filledCount}</span>
      </div>

      <div className={styles.columns}>
        <span className={styles.colLabel}>Options</span>
        <span className={styles.colLabel}>Action</span>
      </div>

      <div className={styles.optionsList}>
        {options.map((opt, i) => (
          <div key={i} className={styles.optionRow}>
            <div className={styles.inputWrap}>
              <input
                className={`${styles.optionInput} ${duplicateIndexes.has(i) ? styles.error : ''}`}
                value={opt}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
              />
              {duplicateIndexes.has(i) && (
                <span className={styles.errorText}>Field options must be unique</span>
              )}
            </div>
            <Button
              type={BUTTON_TYPES.BUTTON}
              variant={VARIANT.ICON}
              className={styles.deleteBtn}
              onClick={() => handleDelete(i)}
            >
              <DeleteIcon />
            </Button>
          </div>
        ))}
      </div>

      <div className={styles.addRow}>
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={VARIANT.SECONDARY}
          className={styles.addBtn}
          onClick={handleAdd}
        >
          <PlusIcon />
          Add Option
        </Button>
      </div>

      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={VARIANT.PRIMARY}
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={hasError}
      >
        Save Options
      </Button>
    </FormWrapper>
  )
}

export default OptionsModal
