import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { MOCKED_AUTH_STATE, MOCKED_SIGN_UP_DETAILS } from '@Mocks/state/auth.mock';
import { State } from '@Models/store.model';
import { Spied } from '@Specs/types/utils.type';

import { SignUpDetails } from '../models/sign-up-details.model';
import { setPendingState, signUp } from './auth.actions';
import { AuthFacade } from './auth.facade';

describe('AuthFacade', (): void => {
  let facade: AuthFacade;
  let mockedStore: Spied<Store<State>>;

  beforeEach((): void => {
    mockedStore = jasmine.createSpyObj(Store, ['dispatch', 'pipe']);

    TestBed.configureTestingModule({
      providers: [
        AuthFacade,
        {provide: Store, useValue: mockedStore},
      ],
    });

    facade = TestBed.inject(AuthFacade);
  });

  describe('setPendingState', (): void => {
    it('should dispatch setPendingState action', (): void => {
      const pending: boolean = MOCKED_AUTH_STATE.pending;

      facade.setPendingState(pending);

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(setPendingState({isPending: pending}));
    });
  });

  describe('signUp', (): void => {
    it('should dispatch signUp action', (): void => {
      const signUpDetails: SignUpDetails = MOCKED_SIGN_UP_DETAILS;

      facade.signUp(signUpDetails);

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(signUp({signUpDetails}));
    });
  });
});
