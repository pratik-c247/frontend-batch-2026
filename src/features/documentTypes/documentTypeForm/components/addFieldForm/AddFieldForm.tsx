'use client'
import styles from './AddFieldForm.module.scss'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import OptionsModal from '../optionsModal/OptionsModal'
import SubfieldModal from '../subfieldModal/SubfieldModal'
import type { DocumentField } from '@/types/documentType.types'
import { Input } from '@/comopents/common/formfields/input'
import { Select } from '@/comopents/common/formfields/select'
import { FIELD_TYPE_OPTIONS } from '@/data/fieldTypeOptions'
import PlusIcon from '@/assets/icons/PlusIcon'
import { EditIcon } from '@/assets/icons/EditIcon'
import { DeleteIcon } from '@/assets/icons/DeleteIcon'
import { REQUIRED_FIELD_OPTIONS } from '@/data/helper'
import { useAddFieldForm } from '@/features/documentTypes/hooks/useAddFieldForm'

interface AddFieldFormProps {
  initialField?: DocumentField
  onSave: (field: DocumentField) => void
  onCancel: () => void
}

const AddFieldForm = ({
  initialField,
  onSave,
  onCancel,
}: AddFieldFormProps) => {
  const {
    stateValues: {
      setLabelName,
      setErrors,
      setEditingSubfield,
      setShowOptionsModal,
      setIsSubDocument,
      setOptions,
      setShowSubfieldModal,
      setPlaceholderText,
      setIsRequired,
    },
    stateSetter:{
      labelName,
      errors,
      fieldType,
      hasOptions,
      options,
      hasSubfields,
      subfields,
      isSubDocument,
      showIsRequired,
      showPlaceholder,
      placeholderText,
      isRequired,
      showOptionsModal,
      showSubfieldModal,
      editingSubfield,
    },
    handler: {
      handleDeleteSubfield,
      handleSaveSubfield,
      handleFieldTypeChange,
      handleSave,
    },
  } = useAddFieldForm({ initialField, onSave })
  return (
    <>
      <div className={styles.formCard}>
        <div className={styles.row}>
          <Input
            label="Label Name"
            required
            value={labelName}
            onChange={(e) => {
              setLabelName(e.target.value)
              setErrors((prev) => ({ ...prev, labelName: '' }))
            }}
            error={errors.labelName}
            placeholder=""
          />
          <Select
            label="Field Type"
            required
            value={fieldType}
            onChange={(value) => handleFieldTypeChange(String(value))}
            options={FIELD_TYPE_OPTIONS}
            placeholder="Select Field Type"
            error={errors.fieldType}
          />
        </div>

        {/* Options banner (custom_dropdown / radio_button / checkbox / multi_select) */}
        {hasOptions && (
          <div className={styles.infoBanner}>
            {options.length > 0 ? (
              <span className={styles.optionsBadge}>
                Added Options : {options.length}
              </span>
            ) : (
              <span className={styles.bannerText}>
                Use the button on the right to add options to this field type.
              </span>
            )}
            <Button
              type={BUTTON_TYPES.BUTTON}
              className={styles.addOptionsBtn}
              onClick={() => setShowOptionsModal(true)}
            >
              <PlusIcon />
              {options.length > 0 ? 'Edit Options' : 'Add Options'}
            </Button>
          </div>
        )}

        {hasSubfields && (
          <>
            <div className={styles.infoBanner}>
              <span className={styles.bannerText}>
                Use the button on the right to add subfield to this field type.
              </span>
              <Button
                type={BUTTON_TYPES.BUTTON}
                className={styles.addOptionsBtn}
                onClick={() => {
                  setEditingSubfield(undefined)
                  setShowSubfieldModal(true)
                }}
              >
                <PlusIcon />
                Add Subfield
              </Button>
            </div>

            {/* Saved subfields list */}
            {subfields.length > 0 && (
              <div className={styles.subfieldsList}>
                {subfields.map((sf) => (
                  <div key={sf.id} className={styles.subfieldCard}>
                    <div className={styles.subfieldInfo}>
                      <div className={styles.subfieldRow}>
                        <span className={styles.sfKey}>
                          Subfield Label Name
                        </span>
                        <span>: {sf.label_name}</span>
                      </div>
                      <div className={styles.subfieldRow}>
                        <span className={styles.sfKey}>Field Type</span>
                        <span>
                          :{' '}
                          {FIELD_TYPE_OPTIONS.find(
                            (o) => o.value === sf.field_type,
                          )?.label ?? sf.field_type}
                        </span>
                      </div>
                      <div className={styles.subfieldRow}>
                        <span className={styles.sfKey}>Placeholder Text</span>
                        <span>: {sf.placeholder_text || '-'}</span>
                      </div>
                      <div className={styles.subfieldRow}>
                        <span className={styles.sfKey}>Mark as Required</span>
                        <span>: {sf.is_required ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                    <div className={styles.subfieldActions}>
                      <Button
                        type={BUTTON_TYPES.BUTTON}
                        variant={VARIANT.ICON}
                        className={styles.sfEditBtn}
                        onClick={() => {
                          setEditingSubfield(sf)
                          setShowSubfieldModal(true)
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        type={BUTTON_TYPES.BUTTON}
                        variant={VARIANT.ICON}
                        className={styles.sfDeleteBtn}
                        onClick={() => handleDeleteSubfield(sf.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Checkbox sub-document */}
        {fieldType === 'checkbox' && (
          <label className={styles.subDocRow}>
            <input
              type="checkbox"
              checked={isSubDocument}
              onChange={(e) => setIsSubDocument(e.target.checked)}
              className={styles.subDocCheckbox}
            />
            <span>Is this a sub-document field?</span>
          </label>
        )}

        {/* Row 2: Placeholder + Mark as Required */}
        {(showPlaceholder || showIsRequired) && (
          <div className={styles.row}>
            {showPlaceholder && (
              <Input
                label="Placeholder Text"
                value={placeholderText}
                onChange={(e) => setPlaceholderText(e.target.value)}
              />
            )}
            {showIsRequired && (
              <Select
                label="Mark as Required?"
                required
                value={isRequired}
                options={REQUIRED_FIELD_OPTIONS}
                placeholder="Select Mark As Required?"
                error={errors.isRequired}
                onChange={(value) => {
                  setIsRequired(String(value))
                  setErrors((prev) => ({
                    ...prev,
                    isRequired: '',
                  }))
                }}
              />
            )}
          </div>
        )}

        <div className={styles.actions}>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={VARIANT.SECONDARY}
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={VARIANT.BLUE}
            className={styles.saveFieldBtn}
            onClick={handleSave}
          >
            Save Field
          </Button>
        </div>
      </div>

      {showOptionsModal && (
        <OptionsModal
          initialOptions={options}
          onSave={(opts) => {
            setOptions(opts)
            setShowOptionsModal(false)
          }}
          onClose={() => setShowOptionsModal(false)}
        />
      )}

      {showSubfieldModal && (
        <SubfieldModal
          initialSubfield={editingSubfield}
          onSave={handleSaveSubfield}
          onClose={() => {
            setEditingSubfield(undefined)
            setShowSubfieldModal(false)
          }}
        />
      )}
    </>
  )
}

export default AddFieldForm
