import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Password } from 'primeng/password';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';

import { REGEX } from '@Consts/regex.const';
import { VerifyEmail } from '@Models/verify-email.model';
import { AuthRepository } from '@Modules/auth/shared/auth.repository';

@Injectable()
export class ValidatorsService {

  public constructor(
    private readonly password: Password,
    private readonly authRepository: AuthRepository,
  ) {
  }

  public validatePassword(firstNameControl: AbstractControl, lastNameControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalidValidationError: ValidationErrors = { password: true };
      const containsNameValidationError: ValidationErrors = { containsName: true };
      const firstName: string = firstNameControl.value;
      const lastName: string = lastNameControl.value;
      const password: string = control.value;

      if (password) {
        this.password.mediumCheckRegExp = REGEX.password;
        this.password.strongCheckRegExp = new RegExp(this.password.strongRegex);

        if (this.password.testStrength(password) < 2) {
          return invalidValidationError;
        }

        const passwordContainsName: boolean = [firstName, lastName].some((name: string): boolean => (
          !!name && password.toLowerCase().includes(name.toLowerCase())
        ));

        if (passwordContainsName) {
          return containsNameValidationError;
        }

        return null;
      }

      return null;
    };
  }

  public verifyEmailAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    const emailNotExistValidationError: ValidationErrors = { notExist: true };

    return this.authRepository.verifyEmail(control.value)
      .pipe(
        first(),
        map((response: VerifyEmail): ValidationErrors | null => {

          if (!response.mx_found || !response.smtp_check) {
            return emailNotExistValidationError;
          }

          return null;
        }),
        catchError((): Observable<ValidationErrors> => of(emailNotExistValidationError)),
      );
  }
}
