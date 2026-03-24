import toast from 'react-hot-toast'

export const AUTH_MESSAGES = {
  //  Success
  LOGIN_SUCCESS: 'Login successful',
  REGISTRATION_SUCCESS: 'Registration successful',
  GOOGLE_LOGIN_SUCCESS: 'Google login successful',
  RESET_LINK_SENT: 'Reset link sent successfully',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFIEL_UPDATE_SUCCESS: 'Profile updated successfully',
  PASSWORD_CHANGE_SUCCESS: 'Password changed successfully',
  AUTHENTICATOR_APP_CONFIGURED: 'Authenticator app configured!',
  EMAIL_SETUP_CONFIGURED: 'Email authentication configured!',
  SMS_SETUP_CONFIGURED:'SMS authentication configured!',
  NEW_CODE_SENT: 'New code sent',
  CODE_COPY_TO_CLIPBOARD: 'Codes copied to clipboard!',
  RECOVERY_CODE_GENERATED: 'Recovery codes generated!',
  RECOVERY_CODE_ACCEPTED: "Recovery code accepted! Login successful.",
  ACCOUNT_CREATED_SUCCESSFULLY:"Account created successfully",
  DELETE_SUCCESS: (value: string) => `${value} deleted successfully`,
  UPDATED_SUCCESS: (value: string) => `${value} updated successfully`,
  CREATED_SUCCESS: (value: string) => `${value} created successfully`,

  // Error
  SOMETHING_WENT_WRONG: 'Something went wrong',
  LOGIN_FAILED: 'Invalid email or password',
  GOOGLE_LOGIN_FAILED: 'Google login failed',
  REGISTRATION_FAILED: 'Registration failed',
  RESET_LINK_FAILED: 'Failed to send reset link',
  PASSWORD_RESET_FAILED: 'Failed to reset password',
  UNAUTHORIZED: 'You are not authorized',
  SESSION_EXPIRED: 'Session expired. Please login again',
  PASSWORD_DO_NOT_MATCH: 'Passwords do not match',
  PROFILE_UPDATE_FAIL: 'Failed to update profile',
  PASSWORD_CHANGE_FAIL: 'Failed to change password',
  NO_ATTEMPT_ID_RETURNED: 'No attempt ID returned',
  USER_NOT_FOUND: 'User not found',
  INVALID_CODE: 'Invalid code. Please try again.',
  CODE_EXPIRED: 'Code expired. Please resend.',
 AUTHENTICATOR_NOT_SET_PROPERLY :"Authenticator not set properly",
  CODE_ALREADY_GENERATED: 'Recovery codes are already generated.',
  NO_RECOVERY_CODES_GENERATED:
    'No recovery codes generated. Please use another method.',
  UPDATE_FAILED: (value: string) => `Failed to update ${value} `,
  DELETE_FAILED: (value: string) => `Failed to delete ${value} `,
  CREATE_FAILED: (value: string) => `Failed to create ${value} `,
}

export const notify = {
  success: (msg: string) => {
    toast.dismiss()
    toast.success(msg)
  },
  error: (msg: string) => {
    toast.dismiss()
    toast.error(msg)
  },
}
