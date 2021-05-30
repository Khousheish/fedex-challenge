import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatLabelFieldComponent } from './float-label-field.component';

describe('FloatLabelFieldComponent', (): void => {
  let component: FloatLabelFieldComponent;
  let fixture: ComponentFixture<FloatLabelFieldComponent>;

  beforeEach(async(): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ FloatLabelFieldComponent ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(FloatLabelFieldComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
