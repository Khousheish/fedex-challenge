import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Error } from '@Models/error.model';
import { ErrorFacade } from '@Store/error/error.facade';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  public constructor(
    private readonly errorFacade: ErrorFacade,
  ) {
  }

  // tslint:disable: no-any
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => {
          const error: Error = {
            status: httpErrorResponse.status,
            statusText: httpErrorResponse.error.message,
            error: `Error Status: ${httpErrorResponse.status}\nMessage: ${httpErrorResponse.message}`,
          };

          this.errorFacade.catchError([error]);

          return throwError(error);
        }),
      );
  }
}

export const ERROR_HANDLING_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlingInterceptor,
  multi: true,
};
