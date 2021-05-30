import { State } from '@Models/store.model';

import { ErrorsState } from './errors-state';

interface ErrorSelectors {
  selectError(state: State): ErrorsState;
}

export const errorSelectors: ErrorSelectors = {
  selectError: (state: State): ErrorsState => state.shared.errors,
};
