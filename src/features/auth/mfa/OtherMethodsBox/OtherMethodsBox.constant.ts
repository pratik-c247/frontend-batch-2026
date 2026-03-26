import { ROUTES } from '@/constant/routes';
import { AUTH_TEXTS } from '../../auth.constant';

export const METHOD_LABELS: Record<
  string,
  { label: string; route: string; description: string }
> = {
  authenticator: {
    label: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.authenticator.label,
    route: ROUTES.VERIFY.APP,
    description: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.authenticator.description,
  },
  email: {
    label: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.email.label,
    route: ROUTES.VERIFY.EMAIL,
    description: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.email.description,
  },
  sms: {
    label: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.sms.label,
    route: ROUTES.VERIFY.SMS,
    description: AUTH_TEXTS.OTHER_METHODS_BOX.METHODS.sms.description,
  },
}


export const METHOD_CONFIG: Record<
  string,
  { label: string; route: string; description: string }
> = {
  authenticator: {
    label: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.authenticator.label,
    route: ROUTES.MFA.AUTHENTICATOR_SETUP,
    description:
      AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.authenticator.description,
  },
  email: {
    label: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.email.label,
    route: ROUTES.MFA.EMAIL_SETUP,
    description: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.email.description,
  },
  sms: {
    label: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.sms.label,
    route: ROUTES.MFA.SMS_SETUP,
    description: AUTH_TEXTS.SETUP_OTHER_METHODS_BOX.METHODS.sms.description,
  },
}




export const ALL_METHODS = ['authenticator', 'email', 'sms']