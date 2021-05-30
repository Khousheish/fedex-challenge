import { ActionReducer, createReducer, on } from '@ngrx/store';

import { SetPendingActionType } from '@Types/pending-action.types';

import { SignUpSuccessActionType } from '../types/action.types';
import { AuthActionsTypes, setPendingState, signUp, signUpSuccess } from './auth.actions';
import { AuthState } from './auth.state';

export const authInitialState: AuthState = {
  pending: false,
  user: null,
};

export const authReducer: ActionReducer<AuthState> = createReducer(
  authInitialState,
  on(setPendingState, (state: AuthState, action: SetPendingActionType<AuthActionsTypes.Pending>): AuthState => ({
    ...state,
    pending: action.isPending,
  })),
  on(
    signUp,
    (state: AuthState): AuthState => ({
      ...state,
      pending: true,
    }),
  ),
  on(
    signUpSuccess,
    (state: AuthState, action: SignUpSuccessActionType): AuthState => ({
      ...state,
      user: action.user,
    }),
  ),
);
