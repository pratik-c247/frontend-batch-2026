export const VARIANTS = {
  //Todo :- single file for button related constant
  GHOST: 'ghost',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
} as const
export const TOTAL = 60
export const RADIUS = 45
export const CIRCUMFERENCE = 2 * Math.PI * RADIUS
export const COUNTDOWN_START_KEY = 'auto_logout_countdown_start'
export const STAY_LOGGED_IN_KEY = 'auto_logout_stay_active'
export const INACTIVITY_TIMEOUT = 5 * 1000
export const COUNTDOWN_DURATION = 60
export const LAST_ACTIVITY_KEY = 'last_activity'
export const LOGOUT_KEY = 'logout_event'
export const  LOGIN_KEY ='auto_login_broadcast'
export const AUTO_LOGOUT_CONST = {
  SECONDS: 'SECONDS',
  SESSION_TIMEOUT_WARNING: 'Session Timeout Warning',
  YOUR_SESSION_IS_ABOUT_TO_EXPIRE: 'Your session is about to expire.',
  YOU_WILL_BE_LOGGED_OUT: 'You will be logged out due to inactivity',
}
 export  const activityEvents = [
     'mousemove',
     'mousedown',
     'keypress',
     'scroll',
     'click',
   ]