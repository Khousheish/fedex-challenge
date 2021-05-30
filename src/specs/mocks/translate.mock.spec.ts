import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

interface FakeTranslations {
  load: string;
}

const FAKE_TRANSLATIONS: FakeTranslations = {
  load: 'This is a test',
};

class FakeLoader implements TranslateLoader {
  // tslint:disable-next-line:prefer-function-over-method
  public getTranslation(): Observable<FakeTranslations> {
    return of(FAKE_TRANSLATIONS);
  }
}

// tslint:disable-next-line:no-any variable-name
export const TranslateTestingModule: any = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useClass: FakeLoader,
  },
});
