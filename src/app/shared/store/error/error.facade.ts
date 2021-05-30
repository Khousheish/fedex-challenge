import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Error } from '@Models/error.model';
import { State } from '@Models/store.model';

import { catchError, clearError } from './error.actions';
import { errorSelectors } from './error.selectors';
import { ErrorsState } from './errors-state';

@Injectable()
export class ErrorFacade {
  public errors$: Observable<ErrorsState> = this.store.pipe(select(errorSelectors.selectError));

  public constructor(
    private readonly store: Store<State>,
  ) {
  }

  public catchError(errors: Error[]): void {
    this.store.dispatch(catchError({errors}));
  }

  public clearError(): void {
    this.store.dispatch(clearError());
  }
}
