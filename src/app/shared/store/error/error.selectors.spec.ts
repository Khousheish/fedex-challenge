import { MOCKED_STATE } from '@Mocks/state.mock';
import { MOCKED_ERROR } from '@Mocks/state/error.mock';
import { State } from '@Models/store.model';
import { errorSelectors } from '@Store/error/error.selectors';
import { ErrorsState } from '@Store/error/errors-state';

describe('ErrorSelectors', (): void => {
  const state: State = MOCKED_STATE;

  it('selectError', (): void => {
    const errors: ErrorsState = errorSelectors.selectError(state);

    expect(errors).toEqual([MOCKED_ERROR]);
  });
});
