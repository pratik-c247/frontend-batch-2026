import type {
  DocumentTypeRecord,
  DocumentTypeFormValues,
} from '@/types/documentType.types'

const DB_NAME = 'DocumentTypesDB'
const DB_VERSION = 1
const STORE_NAME = 'documentTypes'

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })

const withStore = <T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> =>
  openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, mode)
        const store = transaction.objectStore(STORE_NAME)
        const req = fn(store)
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
      }),
  )

const toRecord = (
  values: DocumentTypeFormValues,
  id?: number,
): Omit<DocumentTypeRecord, 'id'> & { id?: number } => {
  return {
    ...(id !== undefined && { id }),

    document_type: values.document_type,
    is_document_sensitive: false,
    is_required_document_approval: false,
    predefined_fields: values.predefined_fields,
    fields: values.fields,
    fields_count: values.fields_count,
    updated_at: values.updated_at,
    is_document_mandatory: 0,
    is_sensitive_check_mandatory: values.is_document_sensitive ? 1 : 0,
  }
}

export const getAllDocumentTypes = (): Promise<DocumentTypeRecord[]> =>
  withStore('readonly', (store) => store.getAll())

export const getDocumentTypeById = (id: number): Promise<DocumentTypeRecord> =>
  withStore('readonly', (store) => store.get(id))

export const addDocumentType = (
  values: DocumentTypeFormValues,
): Promise<number> =>
  withStore(
    'readwrite',
    (store) => store.add(toRecord(values)) as IDBRequest<number>,
  )

export const updateDocumentType = (
  values: DocumentTypeFormValues & { id: number },
): Promise<void> =>
  withStore(
    'readwrite',
    (store) => store.put(toRecord(values, values.id)) as IDBRequest<void>,
  )

export const deleteDocumentType = (id: number): Promise<void> =>
  withStore('readwrite', (store) => store.delete(id) as IDBRequest<void>)

export const duplicateDocumentType = async (id: number): Promise<number> => {
  const original = await getDocumentTypeById(id)
  const duplicate: Omit<DocumentTypeRecord, 'id'> = {
    ...toRecord(original),
    document_type: `${original.document_type} - Copy`,
  }
  return withStore(
    'readwrite',
    (store) => store.add(duplicate) as IDBRequest<number>,
  )
}
