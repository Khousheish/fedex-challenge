import { MOCKED_STATE } from '@Mocks/state.mock';
import { MOCKED_AUTH_STATE } from '@Mocks/state/auth.mock';
import { State } from '@Models/store.model';

import { authSelectors } from './auth.selectors';

describe('AuthSelectors', (): void => {
  const state: State = MOCKED_STATE;

  it('selectAuthPending', (): void => {
    const pending: boolean = authSelectors.selectAuthPending(state);

    expect(pending).toEqual(MOCKED_AUTH_STATE.pending);
  });
});
