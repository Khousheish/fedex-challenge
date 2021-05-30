import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { merge, Subscription } from 'rxjs';

import { FieldErrors } from '../../enums/field-errors.enum';

@Component({
  selector: 'fc-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorsComponent implements OnDestroy {
  public get fieldControl(): AbstractControl {
    return <AbstractControl>this.control;
  }

  @Input() public set fieldControl(control: AbstractControl) {
    this.control = control;

    this.controlChangeSubscription = merge(
      control.valueChanges,
      control.statusChanges,
    ).subscribe((): void => {
      this.changeDetectorRef.markForCheck();
    });

    if (this.markAsTouched) {
      this.control.markAsTouched();
    }
  }
  @Input() public label: string = '';
  @Input() public errorsTranslationPath: string = 'FORM.ERRORS';
  @Input() public markAsTouched: boolean = false;

  public fieldErrors: typeof FieldErrors = FieldErrors;

  private control: AbstractControl | undefined;
  private controlChangeSubscription: Subscription | null = null;

  public constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnDestroy(): void {
    this.controlChangeSubscription?.unsubscribe();
  }
}
