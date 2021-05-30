import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsType, ModulesType } from '@Types/module.types';

import { PasswordControlDirective } from './password-control.directive';

const directives: ComponentsType = [
  PasswordControlDirective,
];

const modules: ModulesType = [
  CommonModule,
];

@NgModule({
  declarations: [ ...directives ],
  imports: [ ...modules ],
  exports: [ ...directives ],
})
export class PasswordControlModule { }
