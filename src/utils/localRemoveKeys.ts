import { COUNTDOWN_START_KEY, LAST_ACTIVITY_KEY, LOGIN_KEY } from '@/constant/common'
import { LOCAL_VARIABLES } from '@/constant/localVariables'

 const STORAGE_KEYS = [
  LOCAL_VARIABLES.CURRENT_USER_EMAIL,
  LAST_ACTIVITY_KEY,
  COUNTDOWN_START_KEY,
  LOGIN_KEY,
]
export const clearAuthStorage = () => {
  STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key)
  })
}
