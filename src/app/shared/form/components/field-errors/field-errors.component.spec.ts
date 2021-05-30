import { ComponentFixture, TestBed, TestBedStatic } from '@angular/core/testing';

import { FieldErrorsComponent } from './field-errors.component';

describe('FieldErrorsComponent', (): void => {
  let component: FieldErrorsComponent;
  let fixture: ComponentFixture<FieldErrorsComponent>;

  beforeEach(async(): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ FieldErrorsComponent ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(FieldErrorsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
