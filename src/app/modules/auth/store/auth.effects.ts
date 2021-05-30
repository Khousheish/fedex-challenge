import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';

import { AuthRoutes, ModuleRoutes } from '@Enums/routes.enum';

import { SignUpProps } from '../models/action-props.model';
import { User } from '../models/user.model';
import { AuthRepository } from '../shared/auth.repository';
import { SignUpSuccessActionType } from '../types/action.types';
import { AuthActionsTypes, signUpSuccess } from './auth.actions';
import { AuthFacade } from './auth.facade';

@Injectable()
export class AuthEffects {
  public signUp$: CreateEffectMetadata = createEffect(
    (): Observable<SignUpSuccessActionType> => (
      this.actions$
        .pipe(
          ofType(AuthActionsTypes.SignUp),
          switchMap((action: SignUpProps): Observable<User> => this.authRepository.signUp(action.signUpDetails)),
          map((user: User): SignUpSuccessActionType => signUpSuccess({user})),
          tap(this.authFacade.setPendingState.bind(this.authFacade, false)),
          finalize(this.authFacade.setPendingState.bind(this.authFacade, false)),
        )
    ),
  );

  public signUpSuccess$: CreateEffectMetadata = createEffect(
    (): Observable<void> => (
      this.actions$
        .pipe(
          ofType(AuthActionsTypes.SignUpSuccess),
          tap(this.router.navigate.bind(this.router, [ModuleRoutes.Auth, AuthRoutes.Welcome], undefined)),
        )
    ),
    { dispatch: false },
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly authFacade: AuthFacade,
    private readonly authRepository: AuthRepository,
    private readonly router: Router,
  ) {
  }
}
