import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsType, ModulesType } from '@Types/module.types';

import { FieldErrorsComponent } from './components/field-errors/field-errors.component';
import { FloatLabelFieldComponent } from './components/float-label-field/float-label-field.component';

const components: ComponentsType = [
  FloatLabelFieldComponent,
  FieldErrorsComponent,
];

const modules: ModulesType = [
  CommonModule,
  TranslateModule.forChild({}),
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...components ],
  exports: [ ...components ],
})
export class FormModule {
}
