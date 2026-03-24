import { REGEX_PATTERNS } from '@/constant/regexPatterns'
import { VALIDATION_MESSAGES } from '@/constant/validationMessages'

export const FIRST_NAME = {
  required: VALIDATION_MESSAGES.REQUIRED('First Name'),
  minLength: { value: 2, message: VALIDATION_MESSAGES.MIN_LENGTH(2) },
  maxLength: { value: 50, message: VALIDATION_MESSAGES.MAX_LENGTH(50) },
  pattern: {
    value: /^[A-Za-z0-9 &-]+$/,
    message: "Only letters, numbers, spaces, '-', and '&' are allowed",
  },
}

export const LAST_NAME = {
  required: VALIDATION_MESSAGES.REQUIRED('Last Name'),
  minLength: { value: 2, message: VALIDATION_MESSAGES.MIN_LENGTH(2) },
  maxLength: { value: 50, message: VALIDATION_MESSAGES.MAX_LENGTH(50) },
  pattern: {
    value: /^[A-Za-z0-9 &-]+$/,
    message: "Only letters, numbers, spaces, '-', and '&' are allowed",
  },
}

export const emailValidation = {
  required: VALIDATION_MESSAGES.REQUIRED('Email'),
  pattern: {
    value: REGEX_PATTERNS.EMAIL,
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
}

export const phoneValidation = {
  required: VALIDATION_MESSAGES.REQUIRED('Phone Number'),
  pattern: {
    value: REGEX_PATTERNS.PHONE,
    message: VALIDATION_MESSAGES.INVALID_NUMBER,
  },
}

export const passwordValidation = {
  required: VALIDATION_MESSAGES.REQUIRED('Password'),
  minLength: {
    value: 8,
    message: VALIDATION_MESSAGES.MIN_8_CHARACTERS,
  },
  maxLength: { value: 20, message: VALIDATION_MESSAGES.MAX_LENGTH(20) },
  pattern: {
    value: REGEX_PATTERNS.PASSWORD_REGEX,
    message: VALIDATION_MESSAGES.PASSWORD_WEAK,
  },
}

export const passwordRequired = {
  required: VALIDATION_MESSAGES.REQUIRED('Password'),
}



export const codeValidation = {
  required: VALIDATION_MESSAGES.REQUIRED('Code'),
  minLength: {
    value: 6,
    message: VALIDATION_MESSAGES.MIN_LENGTH(6),
  },
  maxLength: { value: 6, message: VALIDATION_MESSAGES.MAX_LENGTH(6) },
}

export const recoveryCode = {
  required:VALIDATION_MESSAGES.REQUIRED('Code')
}

// export const confirmPasswordValidation = <T extends FieldValues>(
//   passwordField: Path<T>,
// ): RegisterOptions<T, Path<T>> => ({
//   required: VALIDATION_MESSAGES.REQUIRED(FIELD_NAMES.CONFIRM_PASSWORD),
//   validate: (value, formValues) =>
//     value === formValues[passwordField] || AUTH_MESSAGES.PASSWORD_DO_NOT_MATCH,
// })
