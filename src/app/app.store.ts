import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers } from '@ngrx/store';

import { Reducers, Shared, State } from '@Models/store.model';
import { authInitialState } from '@Modules/auth/store/auth.reducers';

import { errorInitialState, errorReducer } from './shared/store/error/error.reducers';

export const initialState: State = {
  shared: {
    errors: errorInitialState,
  },
};

export const getReducers: () => Reducers = (): Reducers => reducers;

export const getInitialState: () => State = (): State => initialState;

const sharedReducers: ActionReducer<Shared> = combineReducers({
  errors: errorReducer,
});

export const reducers: Reducers = {
  shared: sharedReducers,
};

export const reducerToken: InjectionToken<ActionReducerMap<State>> = new InjectionToken('Registered Reducers');

export const REDUCER_PROVIDER: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
