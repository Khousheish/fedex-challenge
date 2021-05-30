import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockComponent, MockDirective, MockModule } from 'ng-mocks';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';

import { PasswordControlDirective } from '@Directives/password-control/password-control.directive';
import { FloatLabelFieldComponent } from '@Form/components/float-label-field/float-label-field.component';
import { FieldsNames } from '@Form/enums/field-names.enum';
import { TranslateTestingModule } from '@Mocks/translate.mock.spec';
import { AuthFacade } from '@Modules/auth/store/auth.facade';
import { ValidatorsService } from '@Services/validators.service';
import { Spied } from '@Specs/types/utils.type';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', (): void => {
  const mockedPasswordControl: FormControl = new FormControl('');
  const mockedFirstNameControl: FormControl = new FormControl('');
  const mockedLastNameControl: FormControl = new FormControl('');
  const mockedFormGroup: FormGroup = new FormGroup({
    [FieldsNames.FirstName]: mockedFirstNameControl,
    [FieldsNames.LastName]: mockedLastNameControl,
    [FieldsNames.Password]: mockedPasswordControl,
  });
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockedAuthFacade: Spied<AuthFacade>;
  let mockedFormBuilder: Spied<FormBuilder>;
  let mockedValidatorsService: Spied<ValidatorsService>;

  beforeEach(async(): Promise<void> => {
    mockedAuthFacade = jasmine.createSpyObj('AuthFacade', ['signUp']);
    mockedFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    mockedFormBuilder.group.and.returnValue(mockedFormGroup);
    mockedValidatorsService = jasmine.createSpyObj('ValidatorsService', ['verifyEmailAsync', 'validatePassword']);
    spyOn(mockedFormGroup, 'get').and.returnValues(mockedFirstNameControl, mockedLastNameControl, mockedPasswordControl);
    spyOn(mockedPasswordControl, 'setValidators');
    spyOn(mockedPasswordControl, 'updateValueAndValidity');

    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MockModule(CardModule),
        MockModule(ButtonModule),
        MockModule(PasswordModule),
        MockModule(DividerModule),
        MockModule(ReactiveFormsModule),
      ],
      declarations: [
        SignUpComponent,
        MockComponent(FloatLabelFieldComponent),
        MockDirective(PasswordControlDirective),
      ],
      providers: [
        {
          provide: AuthFacade,
          useValue: mockedAuthFacade,
        },
        {
          provide: FormBuilder,
          useValue: mockedFormBuilder,
        },
        {
          provide: ValidatorsService,
          useValue: mockedValidatorsService,
        },
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('ngOnInit', (): void => {
    it('should set signUpDetailsForm value', (): void => {
      expect(component.signUpDetailsForm).toEqual(mockedFormGroup);
    });

    it('should update passwordControl validators', (): void => {
      expect(mockedPasswordControl.setValidators).toHaveBeenCalledOnceWith([
        Validators.required,
        mockedValidatorsService.validatePassword(mockedFirstNameControl, mockedLastNameControl),
      ]);
      expect(mockedPasswordControl.updateValueAndValidity).toHaveBeenCalledTimes(1);
    });

    it('should call passwordControl.updateValueAndValidity', (): void => {
      mockedFirstNameControl.patchValue('abc');

      expect(mockedPasswordControl.updateValueAndValidity).toHaveBeenCalled();
    });
  });

  describe('signUp', (): void => {
    it('should call AuthFacade.signUp', (): void => {
      component.signUp();

      expect(mockedAuthFacade.signUp).toHaveBeenCalledOnceWith(component.signUpDetailsForm?.value);
    });
  });
});
