export const REGEX_PATTERNS = {
  PASSWORD_REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,

  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  PHONE: /^[0-9]{7,15}$/,

  ONLY_NUMBERS: /^[0-9]+$/,

  ONLY_LETTERS: /^[A-Za-z]+$/,
} as const
