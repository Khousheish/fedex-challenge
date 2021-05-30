import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@Models/store.model';

import { SignUpDetails } from '../models/sign-up-details.model';
import { User } from '../models/user.model';
import { setPendingState, signUp } from './auth.actions';
import { authSelectors } from './auth.selectors';

@Injectable()
export class AuthFacade {
  public pending$: Observable<boolean> = this.store.pipe(select(authSelectors.selectAuthPending));
  public user$: Observable<User> = this.store.pipe(select(authSelectors.selectAuthUser));

  public constructor(
    private readonly store: Store<State>,
  ) {
  }

  public setPendingState(isPending: boolean): void {
    this.store.dispatch(setPendingState({isPending}));
  }

  public signUp(signUpDetails: SignUpDetails): void {
    this.store.dispatch(signUp({signUpDetails}));
  }
}
