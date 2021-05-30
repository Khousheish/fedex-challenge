import { TestBed } from '@angular/core/testing';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Password } from 'primeng/password';
import { Observable, of, throwError } from 'rxjs';

import { VerifyEmail } from '@Models/verify-email.model';
import { AuthRepository } from '@Modules/auth/shared/auth.repository';
import { Spied } from '@Specs/types/utils.type';

import { ValidatorsService } from './validators.service';

describe('ValidatorsService', (): void => {
  let service: ValidatorsService;
  let mockedAuthRepository: Spied<AuthRepository>;
  let mockedPassword: Spied<Password>;
  const initializeTestService: (testStrength: number, verifyEmailObservable?: Observable<Partial<VerifyEmail>>) => void = (
    testStrength: number,
    verifyEmailObservable: Observable<Partial<VerifyEmail>> = of({}),
  ): void => {
    mockedAuthRepository = jasmine.createSpyObj('AuthRepository', ['verifyEmail']);
    mockedAuthRepository.verifyEmail.and.returnValue(<Observable<VerifyEmail>>verifyEmailObservable);
    mockedPassword = {
      ...jasmine.createSpyObj('Password', ['testStrength']),
      strongRegex: '[a-z]',
    };
    mockedPassword.testStrength.and.returnValue(testStrength);

    TestBed.configureTestingModule({
      providers: [
        ValidatorsService,
        {
          provide: AuthRepository,
          useValue: mockedAuthRepository,
        },
        {
          provide: Password,
          useValue: mockedPassword,
        },
      ],
    });

    service = TestBed.inject(ValidatorsService);
  };

  describe('test with default config', (): void => {
    beforeEach((): void => {
      initializeTestService(3);
    });

    describe('validatePassword', (): void => {
      it('should return null if password is falsy', (): void => {
        const mockedFirstNameControl: FormControl = new FormControl('');
        const mockedLastNameControl: FormControl = new FormControl('');
        const mockedPasswordControl: FormControl = new FormControl('');

        const result: null = <null>service.validatePassword(
          mockedFirstNameControl,
          mockedLastNameControl,
        )(mockedPasswordControl);

        expect(result).toBeNull();
      });
    });

    it('should return contains name validation error if password contains name', (): void => {
      const mockedFirstNameControl: FormControl = new FormControl('abc');
      const mockedLastNameControl: FormControl = new FormControl('');
      const mockedPasswordControl: FormControl = new FormControl('abcde');

      const result: ValidationErrors = <ValidationErrors>service.validatePassword(
        mockedFirstNameControl,
        mockedLastNameControl,
      )(mockedPasswordControl);

      expect(result).toEqual({ containsName: true });
    });
  });

  describe('validatePassword', (): void => {
    const mockedFirstNameControl: FormControl = new FormControl('');
    const mockedLastNameControl: FormControl = new FormControl('');
    const mockedPasswordControl: FormControl = new FormControl('abc');

    it('should return invalid validation error when test strength < 2', (): void => {
      initializeTestService(1);

      const result: ValidationErrors = <ValidationErrors>service.validatePassword(
        mockedFirstNameControl,
        mockedLastNameControl,
      )(mockedPasswordControl);

      expect(result).toEqual({ password: true });
    });

    it('should return null when test strength = 3', (): void => {
      initializeTestService(3);

      const result: null = <null>service.validatePassword(
        mockedFirstNameControl,
        mockedLastNameControl,
      )(mockedPasswordControl);

      expect(result).toBeNull();
    });
  });

  describe('verifyEmailAsync', (): void => {
    const mockedEmailControl: FormControl = new FormControl('');

    it('should return not exist validation error when mx_found is false', (done: DoneFn): void => {
      initializeTestService(1, of({mx_found: false, smtp_check: true}));

      (<Observable<ValidationErrors>>service.verifyEmailAsync(mockedEmailControl))
        .subscribe((result: ValidationErrors): void => {
          expect(result).toEqual({ notExist: true });

          done();
        });
    });

    it('should return not exist validation error when smtp_check is false', (done: DoneFn): void => {
      initializeTestService(1, of({mx_found: true, smtp_check: false}));

      (<Observable<ValidationErrors>>service.verifyEmailAsync(mockedEmailControl))
        .subscribe((result: ValidationErrors): void => {
          expect(result).toEqual({ notExist: true });

          done();
        });
    });

    it('should return null when both are true', (done: DoneFn): void => {
      initializeTestService(1, of({mx_found: true, smtp_check: true}));

      (<Observable<null>>service.verifyEmailAsync(mockedEmailControl))
        .subscribe((result: null): void => {
          expect(result).toBeNull();

          done();
        });
    });

    it('should return not exist validation error when error is thrown', (done: DoneFn): void => {
      initializeTestService(1, throwError('error'));

      (<Observable<ValidationErrors>>service.verifyEmailAsync(mockedEmailControl))
        .subscribe((result: ValidationErrors): void => {
          expect(result).toEqual({ notExist: true });

          done();
        });
    });
  });
});
