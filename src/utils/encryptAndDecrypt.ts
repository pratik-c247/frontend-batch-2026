import * as CryptoJS from 'crypto-js'

export const setSecureItem = (key: string, value: string) => {
  console.log('check', value)
  const encrypted = CryptoJS.AES.encrypt(
    value,
    process.env.NEXT_PUBLIC_LOCAL_SECRET!,
  ).toString()
  localStorage.setItem(key, encrypted)
}

export const getSecureItem = (key: string) => {
  const data = localStorage.getItem(key)
  if (!data) return null

  const bytes = CryptoJS.AES.decrypt(
    data,
    process.env.NEXT_PUBLIC_LOCAL_SECRET!,
  )
  return bytes.toString(CryptoJS.enc.Utf8)
}
