import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { MOCKED_SIGN_UP_DETAILS } from '@Mocks/state/auth.mock';
import { MOCKED_USER } from '@Mocks/user.mock';
import { Spied } from '@Specs/types/utils.type';

import { User } from '../models/user.model';
import { AuthRepository } from '../shared/auth.repository';
import { AuthActionsTypes, signUp, signUpSuccess } from './auth.actions';
import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';

describe('AuthEffects', (): void => {
  let effects: AuthEffects;
  let mockedAuthRepository: Spied<AuthRepository>;
  let mockedAuthFacade: Spied<AuthFacade>;
  let mockedRouter: Spied<Router>;
  // tslint:disable-next-line: no-any
  let actionsSubject: Subject<any>;
  // tslint:disable-next-line: no-any
  let mockedActions$: Observable<any>;

  beforeEach((): void => {
    actionsSubject = new Subject();
    mockedActions$ = actionsSubject.asObservable();

    mockedAuthRepository = jasmine.createSpyObj(AuthRepository, [
      'signUp',
    ]);
    mockedAuthFacade = jasmine.createSpyObj(AuthFacade, [
      'setPendingState',
    ]);
    mockedRouter = {
      ...jasmine.createSpyObj('Router', ['navigate']),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {
          provide: Actions,
          useValue: mockedActions$,
        },
        {
          provide: AuthFacade,
          useValue: mockedAuthFacade,
        },
        {
          provide: AuthRepository,
          useValue: mockedAuthRepository,
        },
        {
          provide: Router,
          useValue: mockedRouter,
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  afterEach((): void => {
    mockedRouter.navigate.calls.reset();
  });

  describe('signUp$', (): void => {
    it('should call signUp and emit SignUpSuccess', (done: DoneFn): void => {
      mockedAuthRepository.signUp.and.returnValue(of(MOCKED_USER));

      (<Observable<User>><unknown>effects.signUp$)
        .pipe(take(1))
        // tslint:disable-next-line: no-any
        .subscribe((action: any): void => {
          expect(action.type).toEqual(AuthActionsTypes.SignUpSuccess);

          done();
        });

      actionsSubject.next(signUp({signUpDetails: MOCKED_SIGN_UP_DETAILS}));

      expect(mockedAuthRepository.signUp).toHaveBeenCalledTimes(1);
      expect(mockedAuthRepository.signUp).toHaveBeenCalledWith(MOCKED_SIGN_UP_DETAILS);
    });

    describe('signUpSuccess$', (): void => {
      it('should call router.navigate', (done: DoneFn): void => {
        (<Observable<void>><unknown>effects.signUpSuccess$)
          .pipe(take(1))
          // tslint:disable-next-line: no-any
          .subscribe((): void => {
            expect(mockedRouter.navigate).toHaveBeenCalledTimes(1);

            done();
          });

        actionsSubject.next(signUpSuccess({user: MOCKED_USER}));
      });
    });
  });
});
