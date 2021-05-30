import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { getInitialState, REDUCER_PROVIDER, reducerToken } from '@AppStore';
import { LayoutModule } from '@Components/layout/layout.module';
import { ThemeSwitcherModule } from '@Components/theme-switcher/theme-switcher.module';
import { environment } from '@Environment';
import { ERROR_HANDLING_INTERCEPTOR_PROVIDER } from '@Interceptors/error-handling.interceptor';
import { MultiTranslateLoader } from '@Loaders/multi-translate.loader';
import { LocalizationService } from '@Services/localization.service';
import { ErrorFacade } from '@Store/error/error.facade';
import { ComponentsType, ModulesType } from '@Types/module.types';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorToastComponent } from './shared/components/error-toast/error-toast.component';

const imports: ModulesType = [
  HttpClientModule,
  BrowserModule,
  AppRoutingModule,
  LayoutModule,
  ThemeSwitcherModule,
  BrowserAnimationsModule,
  ToastModule,
  EffectsModule.forRoot([]),
  StoreModule.forRoot(reducerToken, { initialState: getInitialState }),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !environment.production }),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useClass: MultiTranslateLoader,
      deps: [ HttpClient ],
    },
  }),
];

const declarations: ComponentsType = [
  AppComponent,
  ErrorToastComponent,
];

const providers: Provider[] = [
  ErrorFacade,
  REDUCER_PROVIDER,
  ERROR_HANDLING_INTERCEPTOR_PROVIDER,
  MessageService,
  LocalizationService,
  {
    provide: LOCALE_ID,
    deps: [
      LocalizationService,
    ],
    useFactory: (localizationService: LocalizationService): string => (
      localizationService.getLanguage()
    ),
  },
];

@NgModule({
  imports: [
    ...imports,
  ],
  declarations: [
    ...declarations,
  ],
  providers: [
    ...providers,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
