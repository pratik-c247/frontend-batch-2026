import { AUTH_MESSAGES } from '@/constant/authMessages';
import type { User } from '@/types/auth.types'
import { getUserByEmail, saveUser } from '@/utils/indexedDB'

export const verifyRecoveryCode = async (
  email: string,
  inputCode: string,
): Promise<{ success: boolean; message: string }> => {
  const user: User = await getUserByEmail(email)

  if (!user) {
    return { success: false, message: AUTH_MESSAGES.USER_NOT_FOUND }
  }

  const recoveryCodes: { code: string; used: boolean }[] =
    user?.mfa?.recoveryCodes || []

  if (recoveryCodes.length === 0) {
    return { success: false, message: AUTH_MESSAGES.NO_RECOVERY_CODES_GENERATED_YET }
  }

  const index = recoveryCodes.findIndex(
    (c) => c.code === inputCode.trim() && !c.used,
  )

  if (index === -1) {
    return { success: false, message: AUTH_MESSAGES.INVALID_OR_ALREADY_USED_RECOVERY_CODE }
  }

  recoveryCodes[index].used = true

  await saveUser({
    ...user,
    mfa: {
      ...user.mfa,
      recoveryCodes,
    },
  })

  return { success: true, message: AUTH_MESSAGES.RECOVERY_CODE_ACCEPTED }
}
