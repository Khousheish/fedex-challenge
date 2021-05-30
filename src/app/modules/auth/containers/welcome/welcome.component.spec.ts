import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TranslateTestingModule } from '@Mocks/translate.mock.spec';
import { MOCKED_USER } from '@Mocks/user.mock';
import { AuthFacade } from '@Modules/auth/store/auth.facade';
import { Spied } from '@Specs/types/utils.type';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', (): void => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let mockedAuthFacade: Spied<AuthFacade>;

  beforeEach(async(): Promise<void> => {
    mockedAuthFacade = {
      ...jasmine.createSpyObj('AuthFacade', ['']),
      user$: of(MOCKED_USER),
    };

    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
      ],
      declarations: [
        WelcomeComponent,
      ],
      providers: [
        {
          provide: AuthFacade,
          useValue: mockedAuthFacade,
        },
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('ngOnDestroy', (): void => {
    it('should call userSubscription.unsubscribe', (): void => {
      // tslint:disable-next-line: no-string-literal
      const unsubscribeSpy: jasmine.Spy = spyOn(component['userSubscription'], <never>'unsubscribe');

      fixture.destroy();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call userSubscription.unsubscribe if null', (): void => {
      // tslint:disable-next-line: no-string-literal
      const unsubscribeSpy: jasmine.Spy = spyOn(component['userSubscription'], <never>'unsubscribe');
      // tslint:disable-next-line: no-string-literal
      component['userSubscription'] = null;

      fixture.destroy();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(0);
    });
  });
});
