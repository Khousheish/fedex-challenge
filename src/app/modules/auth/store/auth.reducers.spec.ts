import { MOCKED_AUTH_STATE, MOCKED_SIGN_UP_DETAILS } from '@Mocks/state/auth.mock';
import { MOCKED_USER } from '@Mocks/user.mock';

import { User } from '../models/user.model';
import { setPendingState, signUp, signUpSuccess } from './auth.actions';
import { authInitialState, authReducer } from './auth.reducers';
import { AuthState } from './auth.state';

describe('authReducer', (): void => {
  // tslint:disable-next-line: no-any
  const requestSendingActions: any[] = [
    signUp({signUpDetails: MOCKED_SIGN_UP_DETAILS}),
  ];
  const pendingState: AuthState = {
    ...authInitialState,
    pending: true,
  };
  // tslint:disable-next-line: no-any
  const singleTestForGenericAction: (description: string, action: any, outputState: AuthState) => void =
    // tslint:disable-next-line: no-any
    (description: string, action: any, outputState: AuthState): void => {
      it(`${description} for ${action.type} action`, (): void => {
        const state: AuthState = authReducer(
          authInitialState,
          action,
        );

        expect(state).not.toBe(MOCKED_AUTH_STATE);
        expect(state).toEqual(outputState);
      });
    };

  describe('Request Actions', (): void => {
    it('should set state to initial state when passed state is undefined', (): void => {
      const undefinedState: AuthState | undefined = undefined;
      const state: AuthState = authReducer(
        undefinedState,
        // tslint:disable-next-line: no-any
        <any>'SOME_ACTION',
      );

      expect(state).toBe(authInitialState);
    });

    describe('request sending actions', (): void => {
      requestSendingActions.forEach(
        // tslint:disable-next-line: no-any
        (action: any): void => {
          singleTestForGenericAction('should add pending flag', action, pendingState);
        },
      );
    });

    describe('Success Actions', (): void => {
      it('should set pending', (): void => {
        const pending: boolean = false;
        const state: AuthState = authReducer(
          authInitialState,
          setPendingState({isPending: pending}),
        );

        expect(state).not.toBe(authInitialState);
        expect(state).toEqual({
          ...authInitialState,
          pending,
        });
      });

      it('should set user', (): void => {
        const user: User = MOCKED_USER;
        const state: AuthState = authReducer(
          authInitialState,
          signUpSuccess({user}),
        );

        expect(state).not.toBe(authInitialState);
        expect(state).toEqual({
          ...authInitialState,
          user,
        });
      });
    });
  });
});
