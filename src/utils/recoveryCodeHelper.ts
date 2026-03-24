import type { User } from '@/types/auth.types';
import { getUserByEmail, saveUser } from '@/utils/indexedDB'

/**
 * Recovery code verify karta hai aur use hone par used: true mark karta hai.
 * Ek code sirf ek baar use ho sakta hai.
 */
export const verifyRecoveryCode = async (
  email: string,
  inputCode: string,
): Promise<{ success: boolean; message: string }> => {
  const user: User = await getUserByEmail(email)

  if (!user) {
    return { success: false, message: 'User not found.' }
  }

  const recoveryCodes: { code: string; used: boolean }[] =
    user?.mfa?.recoveryCodes || []

  if (recoveryCodes.length === 0) {
    return { success: false, message: 'No recovery codes generated yet.' }
  }

  // Valid aur unused code dhundo
  const index = recoveryCodes.findIndex(
    (c) => c.code === inputCode.trim() && !c.used,
  )

  if (index === -1) {
    return { success: false, message: 'Invalid or already used recovery code.' }
  }

  // Us code ko used mark karo
  recoveryCodes[index].used = true

  await saveUser({
    ...user,
    mfa: {
      ...user.mfa,
      recoveryCodes,
    },
  })

  return { success: true, message: 'Recovery code accepted.' }
}
