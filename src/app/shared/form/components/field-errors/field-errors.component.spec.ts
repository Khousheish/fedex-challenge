import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { Spied } from '@Specs/types/utils.type';

import { FieldErrorsComponent } from './field-errors.component';

describe('FieldErrorsComponent', (): void => {
  let component: FieldErrorsComponent;
  let fixture: ComponentFixture<FieldErrorsComponent>;
  let mockedChangeDetectorRef: Spied<ChangeDetectorRef>;

  beforeEach(async(): Promise<void> => {
    mockedChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);

    await TestBed.configureTestingModule({
      declarations: [ FieldErrorsComponent ],
      providers: [
        {
          provide: ChangeDetectorRef,
          useValue: mockedChangeDetectorRef,
        },
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(FieldErrorsComponent);
    component = fixture.componentInstance;
    component.fieldControl = new FormControl('');

    fixture.detectChanges();
  });

  describe('ngOnDestroy', (): void => {
    it('should call controlChangeSubscription.unsubscribe', (): void => {
      // tslint:disable-next-line: no-string-literal
      const unsubscribeSpy: jasmine.Spy = spyOn(component['controlChangeSubscription'], <never>'unsubscribe');

      fixture.destroy();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call controlChangeSubscription.unsubscribe if null', (): void => {
      // tslint:disable-next-line: no-string-literal
      const unsubscribeSpy: jasmine.Spy = spyOn(component['controlChangeSubscription'], <never>'unsubscribe');
      // tslint:disable-next-line: no-string-literal
      component['controlChangeSubscription'] = null;

      fixture.destroy();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(0);
    });
  });
});
