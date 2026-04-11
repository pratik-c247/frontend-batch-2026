export const VARIANTS = {
  //Todo :- single file for button related constant
  GHOST: 'ghost',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
} as const
export const TOTAL = 60
export const RADIUS = 45
export const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export const INACTIVITY_TIMEOUT = 60 * 1000
export const COUNTDOWN_DURATION = 60

export const AUTO_LOGOUT_CONST = {
  SECONDS: 'SECONDS',
  SESSION_TIMEOUT_WARNING: 'Session Timeout Warning',
  YOUR_SESSION_IS_ABOUT_TO_EXPIRE: 'Your session is about to expire.',
  YOU_WILL_BE_LOGGED_OUT: 'You will be logged out due to inactivity',
}
