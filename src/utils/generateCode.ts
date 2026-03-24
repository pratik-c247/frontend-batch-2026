export const generateCodes = (): string[] => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length: 10 }, () =>
    Array.from(
      { length: 10 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join(''),
  )
}
