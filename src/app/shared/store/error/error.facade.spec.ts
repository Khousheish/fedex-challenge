import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { MOCKED_ERROR } from '@Mocks/state/error.mock';
import { Error } from '@Models/error.model';
import { State } from '@Models/store.model';
import { Spied } from '@Specs/types/utils.type';
import { catchError, clearError } from '@Store/error/error.actions';
import { ErrorFacade } from '@Store/error/error.facade';

describe('ErrorFacade', (): void => {
  let facade: ErrorFacade;
  let mockedStore: Spied<Store<State>>;

  beforeEach((): void => {
    mockedStore = jasmine.createSpyObj(Store, ['dispatch', 'pipe']);

    TestBed.configureTestingModule({
      providers: [
        ErrorFacade,
        { provide: Store, useValue: mockedStore },
      ],
    });

    facade = TestBed.inject(ErrorFacade);
  });

  describe('catchError', (): void => {
    it('should dispatch catchError action', (): void => {
      const errors: Error[] = [MOCKED_ERROR];

      facade.catchError(errors);

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(catchError({ errors }));
    });
  });

  describe('clearError', (): void => {
    it('should dispatch clearError action', (): void => {
      facade.clearError();

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(clearError());
    });
  });
});
