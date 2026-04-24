'use client'
import { useState } from 'react'
import styles from './AddFieldForm.module.scss'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import OptionsModal from '../OptionsModal/OptionsModal'
import SubfieldModal from '../SubfieldModal/SubfieldModal'
import type { DocumentField, SubField } from '@/types/documentType.types'
import { Input } from '@/comopents/common/formfields/input'
import { Select } from '@/comopents/common/formfields/select'
import { FIELD_TYPE_OPTIONS } from '@/data/fieldTypeOptions'
import PlusIcon from '@/assets/icons/PlusIcon'

const REQUIRED_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const TYPES_WITH_OPTIONS = [
  'custom_dropdown',
  'multi_select_dropdown',
  'radio_button',
  'checkbox',
]
const TYPES_WITH_SUBFIELDS = ['toggle_switch']
const TYPES_WITHOUT_PLACEHOLDER = ['checkbox', 'toggle_switch', 'radio_button']

interface AddFieldFormProps {
  initialField?: DocumentField
  onSave: (field: DocumentField) => void
  onCancel: () => void
}

const generateId = () =>
  `field_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

const AddFieldForm = ({
  initialField,
  onSave,
  onCancel,
}: AddFieldFormProps) => {
  const [labelName, setLabelName] = useState(initialField?.label_name ?? '')
  const [fieldType, setFieldType] = useState(initialField?.field_type ?? '')
  const [placeholderText, setPlaceholderText] = useState(
    initialField?.placeholder_text ?? '',
  )
  const [isRequired, setIsRequired] = useState<string>(
    initialField ? (initialField.is_required ? 'yes' : 'no') : '',
  )
  const [options, setOptions] = useState<string[]>(initialField?.options ?? [])
  const [subfields, setSubfields] = useState<SubField[]>(
    initialField?.subfields ?? [],
  )
  const [isSubDocument, setIsSubDocument] = useState(
    initialField?.is_sub_document ?? false,
  )

  const [showOptionsModal, setShowOptionsModal] = useState(false)
  const [showSubfieldModal, setShowSubfieldModal] = useState(false)
  const [editingSubfield, setEditingSubfield] = useState<SubField | undefined>()

  const [errors, setErrors] = useState<Record<string, string>>({})

  const hasOptions = TYPES_WITH_OPTIONS.includes(fieldType)
  const hasSubfields = TYPES_WITH_SUBFIELDS.includes(fieldType)
  const showPlaceholder = !TYPES_WITHOUT_PLACEHOLDER.includes(fieldType)
  const showIsRequired = !hasSubfields

  const validate = () => {
    const e: Record<string, string> = {}
    if (!labelName.trim()) e.labelName = 'Label name is required'
    if (!fieldType) e.fieldType = 'Field type is required'
    if (showIsRequired && !isRequired)
      e.isRequired = 'Mark as required is required'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }

    onSave({
      id: initialField?.id ?? generateId(),
      label_name: labelName.trim(),
      field_type: fieldType,
      placeholder_text: placeholderText.trim(),
      is_required: isRequired === 'yes',
      ...(hasOptions && { options }),
      ...(hasSubfields && { subfields }),
      ...(fieldType === 'checkbox' && { is_sub_document: isSubDocument }),
    })
  }

  const handleFieldTypeChange = (val: string) => {
    setFieldType(val)
    setOptions([])
    setSubfields([])
    setIsSubDocument(false)
    setErrors((prev) => ({ ...prev, fieldType: '' }))
  }

  const handleSaveSubfield = (sf: SubField) => {
    if (editingSubfield) {
      setSubfields((prev) => prev.map((s) => (s.id === sf.id ? sf : s)))
    } else {
      setSubfields((prev) => [...prev, sf])
    }
    setEditingSubfield(undefined)
    setShowSubfieldModal(false)
  }

  const handleDeleteSubfield = (id: string) =>
    setSubfields((prev) => prev.filter((s) => s.id !== id))

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
            onChange={(e) => handleFieldTypeChange(e.target.value)}
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
              variant={VARIANT.PRIMARY}
              className={styles.addOptionsBtn}
              onClick={() => setShowOptionsModal(true)}
            >
              <PlusIcon />
              {options.length > 0 ? 'Edit Options' : 'Add Options'}
            </Button>
          </div>
        )}

        {/* Subfield banner (toggle_switch) */}
        {hasSubfields && (
          <>
            <div className={styles.infoBanner}>
              <span className={styles.bannerText}>
                Use the button on the right to add subfield to this field type.
              </span>
              <Button
                type={BUTTON_TYPES.BUTTON}
                variant={VARIANT.PRIMARY}
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
                        ✎
                      </Button>
                      <Button
                        type={BUTTON_TYPES.BUTTON}
                        variant={VARIANT.ICON}
                        className={styles.sfDeleteBtn}
                        onClick={() => handleDeleteSubfield(sf.id)}
                      >
                        🗑
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
                placeholder=""
              />
            )}
            {showIsRequired && (
              <Select
                label="Mark as Required?"
                required
                value={isRequired}
                onChange={(e) => {
                  setIsRequired(e.target.value)
                  setErrors((prev) => ({ ...prev, isRequired: '' }))
                }}
                options={REQUIRED_OPTIONS}
                placeholder="Select Mark As Required?"
                error={errors.isRequired}
              />
            )}
          </div>
        )}

        {/* Action buttons */}
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
            variant={VARIANT.PRIMARY}
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
