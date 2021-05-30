import { ActionReducer } from '@ngrx/store';

import { AuthState } from '@Modules/auth/store/auth.state';
import { ErrorsState } from '@Store/error/errors-state';

// tslint:disable-next-line: no-empty-interface
export interface LazyModules {
  auth?: AuthState;
}

export interface Shared {
  errors: ErrorsState;
}

export interface State extends LazyModules {
  shared: Shared;
}

export interface Reducers {
  shared: ActionReducer<Shared>;
}
