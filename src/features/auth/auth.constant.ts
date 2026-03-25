export const AUTH_TEXTS = {
  MFA: {
    SETUP_WAYS: {
      AUTHENTICATOR: 'authenticator',
      EMAIL: 'email',
      SMS: 'sms',
      RECOVERY: 'recovery',
    } as const,

    ACTIVATED: {
      TITLE: 'MFA Activated!',
      SUBTITLE: (method: string) =>
        `Your MFA is complete with the ${method}. You can now securely access your account.`,

      METHODS: {
        EMAIL: {
          LABEL: 'Email',
          DETAIL: (email: string) =>
            `You will receive a one-time code at this email: ${email}`,
        },
        AUTHENTICATOR: {
          LABEL: 'Authenticator App',
          DETAIL: 'Your authenticator app is configured.',
        },
        SMS: {
          LABEL: 'SMS/Text Message',
          DETAIL: (phone: string) =>
            `You will receive a one-time code at: ${phone}`,
        },
      },

      CONFIGURED_BADGE: 'Configured',
      PORTAL_BUTTON: 'Go to portal',

      RECOVERY: {
        BUTTON: 'Generate recovery codes',
        DESCRIPTION:
          'Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.',
      },
    },
  },
  SETUP_MFA: {
    TITLE: 'Secure Your Account with Multi-Factor Authentication',
    WE_HIGHLY_RECOMMEND_ADDING:
      'We highly recommend adding extra layers of security by enabling two or more verification methods.',
    AT_LEAST_ONE_METHOD_REQUIRED:
      'At least one authentication method is required.',
    RECOMMENDED: 'Recommended',
  },
  OTHER_METHODS_BOX: {
    TITLE: 'Use Other Method',
    METHODS: {
      authenticator: {
        label: 'Authenticator App',
        description: 'Use an authentication app to get one-time code.',
      },
      email: {
        label: 'Email',
        description: 'Use email to get one-time code.',
      },
      sms: {
        label: 'SMS/Text Message',
        description: 'Use SMS/Text to get one-time code.',
      },
    },
    RECOVERY: {
      LABEL: 'Use a recovery code',
      DESCRIPTION: 'Use a recovery code for portal Sign In',
    },
  },

  SETUP_OTHER_METHODS_BOX: {
    TITLE: 'Enable more MFA methods',
    METHODS: {
      authenticator: {
        label: 'Authenticator App',
        description: 'Use an authenticator app to generate a one-time code.',
      },
      email: {
        label: 'Email',
        description: 'Use email to generate a one-time code.',
      },
      sms: {
        label: 'SMS/Text Message',
        description: 'Use a mobile number to generate a one-time code.',
      },
    },
  },

  SETUP_AUTHENTICATOR: {
    TITLE: 'Setup Authenticator App',
    SUBTITLE_PART1: 'Authenticator apps like',
    SUBTITLE_PART2:
      'generate one-time codes that are used to verify your identity when prompted during sign-in.',
    MICROSOFT_LABEL: 'Microsoft Authenticator',
    MICROSOFT_URL:
      'https://www.microsoft.com/en-us/security/mobile-authenticator-app',
    GOOGLE_LABEL: 'Google Authenticator',
    GOOGLE_URL: 'https://googleauthenticator.net/',
    QR_TITLE: 'Scan the QR code',
    QR_SUBTITLE: 'Use an authenticator app to scan.',
    MANUAL_TEXT_PART1: 'Unable to scan? You can use a',
    SETUP_KEY_LABEL: 'setup key',
    MANUAL_TEXT_PART2: 'for manual configuration.',
  },

  SETUP_EMAIL: {
    TITLE: 'Setup Email Authentication',
    SUBTITLE:
      'Receive an authentication code via email to verify your identity when prompted during sign-in.',
    OTP_NOTE: 'You will receive a one-time code at this Email:',
    CODE_INPUT_LABEL: 'Verify the code from Email',
  },

  SETUP_RECOVERY_CODES: {
    TITLE: 'Recovery Codes',
    SUBTITLE:
      'Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.',
    WARNING:
      'Keep your recovery codes in a safe spot. These codes are the last resort for accessing your account in case you lose your password and second factors. If you cannot find these codes, you will lose access to your account.',
    GENERATE_TITLE: 'Generate Recovery Codes',
    GENERATE_DESC_PART1:
      'and print them or copy them to a secure location. If you have generated codes before, your previous codes will no longer work once new codes are created.',
    GENERATE_LINK_LABEL: 'Generate Recovery Codes',
  },

  SETUP_SMS: {
    TITLE: 'Setup SMS/Text Message Authentication',
    SUBTITLE:
      'Receive an authentication code via SMS/text message to verify your identity when prompted during sign-in.',
    PHONE_LABEL: 'Mobile Number',
    PHONE_VALIDATION: {
      REQUIRED: 'Phone number is required',
    },

    OTP_NOTE: 'You will receive a one-time code at this phone number:',
    CODE_INPUT_LABEL: 'Verify the code from SMS/Text Message',
  },
  VERIFY_EMAIL: {
    WHEN_YOU_ARE_READY:
      ' When you are ready, click the button below to receive a code via',
    YOU_WILL_RECEIVE_ONE_TIME_CODE:
      'You will receive one-time code to your email.',
  },
  VERIFY_RECOVERY_CODE: {
    IF_YOU_ARE_UNABLE_TO_ACCESS:
      ' If you are unable to access your main device, enter one of your recovery codes to verify your identity.',
  },
  VERIFY_AUTHENTICAOR: {
    YOU_WILL_RECEIVE_THE_TOTP:
      'You will receive the TOTP (Time-based One-Time Password) on the',
    AUTHENTICATOR_APP: 'Authenticator app',
  },
  VERIFY_SMS: {
    YOU_WILL_RECIEVE_ONE_TIME_CODE:
      'You will receive one-time code to your phone number.',
    WHEN_YOUR_PHONE_READY:
      'When your phone is ready, click the button below to receive a code via',
  },
  SIGN_IN: {
    TITLE: 'Sign in to the Auth-MFA',
  },
  SING_UP: {
    TITLE: 'Create your Auth-MFA Account',
  },
  SESSION_VARIABLES: {
    EMAIL_OTP: 'email_otp',
    EMAIL_OTP_EXPIRES: 'email_otp_expires',
    SMS_OTP: 'sms_otp',
    SMS_OTP_EXPIRES: 'sms_otp_expires',
  } as const,


  
}
