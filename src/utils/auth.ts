import { LOCAL_VARIABLES } from '@/constant/localVariables'
import { getSecureItem } from './encryptAndDecrypt'

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false
  return !!getSecureItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL)
}
