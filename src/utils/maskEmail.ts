// maskEmail.ts
export const maskEmail = (email: string) => {
  if (!email) return ''

  const [local, domain] = email.split('@')

  const masked =
    local[0] +
    '*'.repeat(Math.max(local.length - 2, 4)) +
    local[local.length - 1]

  return `${masked}@${domain}`
}
