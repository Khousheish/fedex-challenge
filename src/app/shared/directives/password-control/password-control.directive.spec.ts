import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockModule } from 'ng-mocks';
import { PasswordModule } from 'primeng/password';

import { PasswordControlDirective } from './password-control.directive';

// tslint:disable-next-line: use-component-selector
@Component({
  // tslint:disable-next-line: component-max-inline-declarations
  template: `<p-password fcPasswordControl>`,
})
class TestPasswordControlComponent {
}

xdescribe('PasswordControlDirective', (): void => {
  let component: TestPasswordControlComponent;
  let fixture: ComponentFixture<TestPasswordControlComponent>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(PasswordModule),
      ],
      declarations: [TestPasswordControlComponent, PasswordControlDirective]
    });
    fixture = TestBed.createComponent(TestPasswordControlComponent);
    component = fixture.componentInstance;
  });

  it('', (): void => {
    fixture.detectChanges();
  });
});
