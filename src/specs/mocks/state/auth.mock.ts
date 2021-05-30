import { VerifyEmail } from '@Models/verify-email.model';
import { SignUpDetails } from '@Modules/auth/models/sign-up-details.model';
import { AuthState } from '@Modules/auth/store/auth.state';

import { MOCKED_USER } from '../user.mock';

export const MOCKED_VERIFY_EMAIL: VerifyEmail = {
  email: 'khousheish@live.com',
  did_you_mean: '',
  user: 'khousheish',
  domain: 'live.com',
  format_valid: true,
  mx_found: true,
  smtp_check: true,
  catch_all: true,
  role: true,
  disposable: true,
  free: true,
  score: 1,
};

export const MOCKED_SIGN_UP_DETAILS: SignUpDetails = {
  firstName: 'hassan',
  lastName: 'khousheish',
  email: 'khousheish@live.com',
  password: 'testABCD',
};

export const MOCKED_AUTH_STATE: AuthState = {
  pending: false,
  user: MOCKED_USER,
};
