export const VALIDATION_MESSAGES = {
  //  Required
  REQUIRED: (value: string) => `${value} is required`,
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',

  //  Email
  INVALID_EMAIL: 'Please enter a valid email address',

  // Length
  MIN_LENGTH: (length: number) => `Minimum ${length} characters required`,
  MAX_LENGTH: (length: number) => `Maximum ${length} characters allowed`,

  MIN_8_CHARACTERS: 'Minimum 8 characters required',

  //  Password rules
  PASSWORD_WEAK:
    'Password must include uppercase, lowercase, number, and special character',
  PASSWORD_MISMATCH: 'Passwords do not match',

  // 🔹 Numbers
  INVALID_NUMBER: 'Please enter a valid number',
  MIN_VALUE: (value: number) => `Value must be at least ${value}`,
  MAX_VALUE: (value: number) => `Value must not exceed ${value}`,

  // 🔹 Phone
  INVALID_PHONE: 'Please enter a valid phone number',

  // 🔹 URL
  INVALID_URL: 'Please enter a valid URL',

  // 🔹 File
  FILE_REQUIRED: 'File is required',
  INVALID_FILE_TYPE: 'Invalid file type',
  FILE_TOO_LARGE: 'File size is too large',
} as const