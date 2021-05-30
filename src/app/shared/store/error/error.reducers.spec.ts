import { MOCKED_ERROR } from '@Mocks/state/error.mock';
import { Error } from '@Models/error.model';
import { catchError, clearError } from '@Store/error/error.actions';
import { errorInitialState, errorReducer } from '@Store/error/error.reducers';
import { ErrorsState } from '@Store/error/errors-state';

describe('errorReducer', (): void => {
  describe('catchError', (): void => {
    it('should set errors state', (): void => {
      const errors: Error[] = [MOCKED_ERROR];
      const state: ErrorsState = errorReducer(
        errorInitialState,
        catchError({ errors }),
      );

      expect(state).not.toBe(errorInitialState);
      expect(state).toEqual(errors);
    });
  });

  describe('clearError', (): void => {
    it('should set clear error list', (): void => {
      const errors: Error[] = [];
      const state: ErrorsState = errorReducer(
        errorInitialState,
        clearError(),
      );

      expect(state).not.toBe(errorInitialState);
      expect(state).toEqual(errors);
    });
  });
});
