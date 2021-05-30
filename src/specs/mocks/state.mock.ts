import { MOCKED_ERROR } from '@Mocks/state/error.mock';
import { State } from '@Models/store.model';

import { MOCKED_AUTH_STATE } from './state/auth.mock';

export const MOCKED_STATE: State = {
  auth: MOCKED_AUTH_STATE,
  shared: {
    errors: [MOCKED_ERROR],
  },
};
