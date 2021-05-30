import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ERROR_HANDLING_INTERCEPTOR_PROVIDER } from '@Interceptors/error-handling.interceptor';
import { Spied } from '@Specs/types/utils.type';
import { ErrorFacade } from '@Store/error/error.facade';

describe('ErrorHandlingInterceptor', (): void => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let mockedErrorFacade: Spied<ErrorFacade>;

  beforeEach((): void => {
    mockedErrorFacade = jasmine.createSpyObj(ErrorFacade, ['catchError']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        ERROR_HANDLING_INTERCEPTOR_PROVIDER,
        { provide: ErrorFacade, useValue: mockedErrorFacade },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('intercept', (): void => {
    it('should not add headers if req.url does not include apiUrl', (done: DoneFn): void => {
      const errorText: string = 'ERROR';

      const url: string = 'http://someHost/some-url';

      httpClient.get(url).subscribe((): void => { return; }, (): void => {
        expect(mockedErrorFacade.catchError).toHaveBeenCalledOnceWith([{
          status: 0,
          statusText: '',
          error: 'Error Status: 0\nMessage: Http failure response for http://someHost/some-url: 0 ERROR' ,
        }]);

        done();
      });

      const req: TestRequest = httpMock.expectOne(url);

      req.error(new ErrorEvent(errorText), { statusText: errorText });
    });
  });
});
