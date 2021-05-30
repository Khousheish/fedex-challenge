import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiUrls } from '@Enums/api-urls.enum';
import { environment } from '@Environment';
import { VerifyEmail } from '@Models/verify-email.model';

import { SignUpDetails } from '../models/sign-up-details.model';
import { User } from '../models/user.model';

@Injectable()
export class AuthRepository {

  public constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public signUp(signUpDetails: SignUpDetails): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/${ApiUrls.SignUp}`, signUpDetails);
  }

  public verifyEmail(email: string): Observable<VerifyEmail> {
    return this.httpClient.get<VerifyEmail>(`${ApiUrls.VerifyEmail}`, {
      params: {
        access_key: environment.verifyEmailAccessKey,
        email,
      },
    });
  }
}
