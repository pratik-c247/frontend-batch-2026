'use client'

import styles from './OptionsModal.module.scss'
import FormWrapper from '@/comopents/common/formWrapper/FormWrapper'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import { DeleteIcon } from '@/assets/icons/DeleteIcon'
import PlusIcon from '@/assets/icons/PlusIcon'
import { useOptionsModal } from '@/features/documentTypes/hooks/useOptionsModal'

interface OptionsModalProps {
  initialOptions?: string[]
  onSave: (options: string[]) => void
  onClose: () => void
}

const OptionsModal = ({
  initialOptions = [],
  onSave,
  onClose,
}: OptionsModalProps) => {
  const {
    handler: { handleSave, handleDelete, handleAdd, handleChange },
    filledCount,
    isEditing,
    options,
    duplicateIndexes,
    hasError,
  } = useOptionsModal({ initialOptions, onSave })
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
                <span className={styles.errorText}>
                  Field options must be unique
                </span>
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
          className={styles.addBtn}
          onClick={handleAdd}
        >
          <PlusIcon />
          Add Option
        </Button>
      </div>

      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={VARIANT.BLUE}
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
