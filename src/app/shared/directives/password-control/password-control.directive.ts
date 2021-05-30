import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Directive({ selector: '[fcPasswordControl]' })
export class PasswordControlDirective implements OnInit, OnDestroy {
  @Input() public form: FormGroup | null = null;
  @Input() public formControlName: string | null = null;

  @HostBinding('class.p-filled') public inputFilled: boolean = false;
  @HostBinding('class.p-state-focused') public inputFocused: boolean = false;

  @HostBinding('class.fc-password') public readonly password: boolean = true;

  private formValueChangeSubscription: Subscription | null = null;

  public constructor(
    private readonly elementRef: ElementRef,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.handleInput();
    this.handleForm();
  }

  public ngOnDestroy(): void {
    this.formValueChangeSubscription?.unsubscribe();
  }

  public onFocus(): void {
    this.inputFocused = true;

    this.changeDetectorRef.markForCheck();
  }

  public onBlur(): void {
    this.inputFocused = false;

    this.changeDetectorRef.markForCheck();
  }

  private handleInput(): void {
    const input: HTMLInputElement = this.elementRef.nativeElement.getElementsByTagName('input')[0];

    input.onblur = this.onBlur.bind(this);
    input.onfocus = this.onFocus.bind(this);
  }

  private handleForm(): void {
    const formControl: FormControl = <FormControl>this.form?.get(<string>this.formControlName);

    this.formValueChangeSubscription = formControl?.valueChanges
      .pipe(startWith(formControl.value))
      .subscribe(this.onFormValueChange.bind(this));
  }

  private onFormValueChange(fromValue: string): void {
    this.inputFilled = !!fromValue;
  }
}
