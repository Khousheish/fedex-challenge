import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

import { MOCKED_ERROR } from '@Mocks/state/error.mock';
import { Error } from '@Models/error.model';
import { Spied } from '@Specs/types/utils.type';
import { ErrorFacade } from '@Store/error/error.facade';

import { ErrorToastComponent } from './error-toast.component';

describe('ErrorToastComponent', (): void => {
  const errors$: Subject<Error[]> = new Subject<Error[]>();

  let component: ErrorToastComponent;
  let fixture: ComponentFixture<ErrorToastComponent>;
  let errorFacadeStub: Partial<ErrorFacade>;
  let mockMessageService: Spied<MessageService>;

  beforeEach(waitForAsync((): void => {
    errorFacadeStub = { errors$ };
    mockMessageService = jasmine.createSpyObj(MessageService, ['add']);

    TestBed.configureTestingModule({
      declarations: [
        ErrorToastComponent,
      ],
      providers: [
        { provide: ErrorFacade, useValue: errorFacadeStub },
        { provide: MessageService, useValue: mockMessageService },
      ],
    })
    .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(ErrorToastComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('ngOnInit', (): void => {
    it('should call messageService.add on error emit', (done: DoneFn): void => {
      errors$.subscribe((): void => {
        expect(mockMessageService.add).toHaveBeenCalledOnceWith({
          severity: 'error',
          summary: `${MOCKED_ERROR.status}`,
          detail: MOCKED_ERROR.statusText,
          closable: true,
        });

        done();
      });

      errors$.next([MOCKED_ERROR]);
    });
  });

  describe('ngOnDestroy', (): void => {
    it('should call errorSubscription.unsubscribe', (): void => {
      // tslint:disable-next-line: no-string-literal
      const unsubscribeSpy: jasmine.Spy = spyOn(component['errorSubscription'], <never>'unsubscribe');

      fixture.destroy();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call errorSubscription.unsubscribe if null', (): void => {
      const unsubscribeSpy: jasmine.Spy = spyOn(component['errorSubscription'], <never>'unsubscribe');
      component['errorSubscription'] = null;

      fixture.destroy();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(0);
    });
  });
});
