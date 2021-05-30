import { ActionReducer, createReducer, on } from '@ngrx/store';

import { CatchErrorActionType } from '@Types/error-action.types';

import { catchError, clearError } from './error.actions';
import { ErrorsState } from './errors-state';

export const errorInitialState: ErrorsState = [];

export const errorReducer: ActionReducer<ErrorsState> = createReducer(
  errorInitialState,
  on(catchError, (_state: ErrorsState, action: CatchErrorActionType): ErrorsState => action.errors),
  on(clearError, (): [] => []),
);
