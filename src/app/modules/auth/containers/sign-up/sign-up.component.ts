import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { merge, Observable } from 'rxjs';

import { REGEX } from '@Consts/regex.const';
import { FieldsNames } from '@Form/enums/field-names.enum';
import { ValidatorsService } from '@Services/validators.service';

import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'fc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  public signUpDetailsForm: FormGroup | null = null;

  public readonly fieldsNames: typeof FieldsNames = FieldsNames;

  public constructor(
    private readonly authFacade: AuthFacade,
    private readonly formBuilder: FormBuilder,
    private readonly validatorsService: ValidatorsService,
  ) {
  }

  public ngOnInit(): void {
    this.signUpDetailsForm = this.createSignUpForm();

    const firstNameControl: FormControl = <FormControl>this.signUpDetailsForm.get(FieldsNames.FirstName);
    const lastNameControl: FormControl = <FormControl>this.signUpDetailsForm.get(FieldsNames.LastName);
    const passwordControl: FormControl = <FormControl>this.signUpDetailsForm.get(FieldsNames.Password);

    passwordControl.setValidators([
      Validators.required,
      this.validatorsService.validatePassword(
        <AbstractControl>firstNameControl,
        <AbstractControl>lastNameControl,
      ),
    ]);
    passwordControl.updateValueAndValidity({onlySelf: true});

    merge(
      <Observable<string>>firstNameControl.valueChanges,
      <Observable<string>>lastNameControl.valueChanges,
    ).subscribe((): void => {
      passwordControl.updateValueAndValidity({onlySelf: true});
    });
  }

  public signUp(): void {
    this.authFacade.signUp((<FormGroup>this.signUpDetailsForm).value);
  }

  private createSignUpForm(): FormGroup {
    return this.formBuilder.group({
      [FieldsNames.FirstName]: ['', [ Validators.required, Validators.pattern(REGEX.name) ]],
      [FieldsNames.LastName]: ['', [ Validators.required, Validators.pattern(REGEX.name) ]],
      [FieldsNames.Email]: [
        '',
        {
          validators: [ Validators.required, Validators.pattern(REGEX.email) ],
          asyncValidators: this.validatorsService.verifyEmailAsync.bind(this.validatorsService),
        },
      ],
      [FieldsNames.Password]: ['', [ Validators.required ]],
    });
  }
}
