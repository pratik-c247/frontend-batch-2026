import { LOCAL_VARIABLES } from '@/constant/localVariables'

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem(LOCAL_VARIABLES.CURRENT_USER_EMAIL)
}
