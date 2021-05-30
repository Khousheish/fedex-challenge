import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutes } from '@Enums/routes.enum';

import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';

const routes: Routes = [
  {
    path: AuthRoutes.SignUp,
    component: SignUpComponent,
  },
  {
    path: AuthRoutes.Welcome,
    component: WelcomeComponent,
  },
  {
    path: AuthRoutes.Root,
    pathMatch: 'full',
    redirectTo: AuthRoutes.SignUp,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
