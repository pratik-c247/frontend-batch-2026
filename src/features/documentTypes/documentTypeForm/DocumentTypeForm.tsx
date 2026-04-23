'use client'
import styles from './DocumentTypeForm.module.scss'
import FormWrapper from '@/comopents/common/formWrapper/FormWrapper'
import { Switch } from '@/comopents/common/switch'
import { Input } from '@/comopents/common/input'
import { Button } from '@/comopents/common/button'
import { BUTTON_TYPES, VARIANT } from '@/constants/button.const'
import { PlusIcon } from '@/assets/icons/PlusIcon'
import PredefinedFieldsTable from './components/PredefinedFieldsTable/PredefinedFieldsTable'
import AddedFieldsTable from './components/AddedFieldsTable/AddedFieldsTable'
import AddFieldForm from './components/AddFieldForm/AddFieldForm'
import { useDocumentTypeForm } from './hooks/useDocumentTypeForm'
import type { DocumentTypeFormValues } from '@/types/documentType.types'

interface DocumentTypeFormProps {
  mode: 'add' | 'edit'
  initialValues?: DocumentTypeFormValues
  onClose: () => void
  onSubmit: (values: DocumentTypeFormValues) => Promise<void>
}

const DocumentTypeForm = ({
  mode,
  initialValues,
  onClose,
  onSubmit,
}: DocumentTypeFormProps) => {
  const {
    documentTypeName,
    isSensitive,
    requiresApproval,
    predefinedRows,
    fields,
    showAddField,
    nameError,
    totalAddedFields,
    setDocumentTypeName,
    setIsSensitive,
    setRequiresApproval,
    setPredefinedRows,
    setShowAddField,
    handlePredefinedToggle,
    handlePredefinedToggleAll,
    handleAddField,
    handleSaveEditField,
    handleDuplicateField,
    handleDeleteField,
    validate,
    buildFormValues,
  } = useDocumentTypeForm(initialValues)

  const handleSubmit = async () => {
    if (!validate()) return
    await onSubmit(buildFormValues())
  }

  const title = mode === 'edit' ? 'Edit Document Type' : 'Add Document Type'
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Create'

  return (
    <FormWrapper title={title} onClose={onClose}>
      <div className={styles.formBody}>
        {/* Document type name */}
        <Input
          label="Document Type Name"
          required
          value={documentTypeName}
          onChange={(e) => setDocumentTypeName(e.target.value)}
          error={nameError}
          placeholder=""
        />

        {/* Toggles */}
        <Switch
          label="Is this document marked as sensitive by default"
          checked={isSensitive}
          onChange={setIsSensitive}
        />
        <Switch
          label="Does this document require approval"
          checked={requiresApproval}
          onChange={setRequiresApproval}
        />

        {/* Total count */}
        <div className={styles.totalCount}>
          Total Added Fields : {totalAddedFields}
        </div>

        {/* Predefined Fields */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Predefined Fields</h3>
          <PredefinedFieldsTable
            rows={predefinedRows}
            onReorder={setPredefinedRows}
            onToggle={handlePredefinedToggle}
            onToggleAll={handlePredefinedToggleAll}
          />
        </section>

        {/* Added Fields */}
        {fields.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Added Fields</h3>
            <AddedFieldsTable
              fields={fields}
              onReorder={(reordered) =>
                reordered.forEach((_, i) => {
                  // Update internal order by replacing the full array
                })
              }
              onEdit={() => {}}
              onDuplicate={handleDuplicateField}
              onDelete={handleDeleteField}
              onSaveEdit={handleSaveEditField}
            />
          </section>
        )}

        {/* Add Field inline form */}
        {showAddField ? (
          <AddFieldForm
            onSave={handleAddField}
            onCancel={() => setShowAddField(false)}
          />
        ) : (
          <div className={styles.addFieldRow}>
            <Button
              type={BUTTON_TYPES.BUTTON}
              variant={VARIANT.SECONDARY}
              className={styles.addFieldBtn}
              onClick={() => setShowAddField(true)}
            >
              <PlusIcon />
              Add Field
            </Button>
          </div>
        )}
      </div>

      {/* Sticky footer */}
      <div className={styles.footer}>
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={VARIANT.PRIMARY}
          className={styles.submitBtn}
          onClick={handleSubmit}
        >
          {submitLabel}
        </Button>
      </div>
    </FormWrapper>
  )
}

export default DocumentTypeForm
