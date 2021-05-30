import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { Password, PasswordModule } from 'primeng/password';

import { PasswordControlModule } from '@Directives/password-control/password-control.module';
import { ModuleRoutes } from '@Enums/routes.enum';
import { FormModule } from '@Form/form.module';
import { ValidatorsService } from '@Services/validators.service';
import { ComponentsType, ModulesType } from '@Types/module.types';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { AuthRepository } from './shared/auth.repository';
import { AuthEffects } from './store/auth.effects';
import { AuthFacade } from './store/auth.facade';
import { authReducer } from './store/auth.reducers';

const components: ComponentsType = [
  SignUpComponent,
  WelcomeComponent,
];

const primeNgModules: ModulesType = [
  CardModule,
  ButtonModule,
  InputTextModule,
  PasswordModule,
  MessagesModule,
  DividerModule,
];

const modules: ModulesType = [
  ...primeNgModules,
  CommonModule,
  AuthRoutingModule,
  TranslateModule.forChild({}),
  FormModule,
  FormsModule,
  PasswordControlModule,
  ReactiveFormsModule,
  EffectsModule.forFeature([AuthEffects]),
  StoreModule.forFeature(ModuleRoutes.Auth, authReducer),
];

const services: Provider[] = [
  AuthFacade,
  AuthRepository,
  ValidatorsService,
];

const providers: Provider[] = [
  ...services,
  Password,
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...components ],
  providers: [ ...providers ],
})
export class AuthModule {
}
