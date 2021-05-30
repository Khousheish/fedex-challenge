import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiUrls } from '@Enums/api-urls.enum';
import { environment } from '@Environment';
import { MOCKED_SIGN_UP_DETAILS, MOCKED_VERIFY_EMAIL } from '@Mocks/state/auth.mock';
import { MOCKED_USER } from '@Mocks/user.mock';
import { VerifyEmail } from '@Models/verify-email.model';
import { RepositoryRequestMethods } from '@Specs/enums/repository.enum';

import { SignUpDetails } from '../models/sign-up-details.model';
import { User } from '../models/user.model';
import { AuthRepository } from './auth.repository';

describe('AuthRepository', (): void => {
  let authRepository: AuthRepository;
  let httpMock: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthRepository,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    authRepository = TestBed.inject(AuthRepository);
  });

  afterEach((): void => {
    httpMock.verify();
  });

  describe('signUp', (): void => {
    it('should return user details', (done: DoneFn): void => {
      const signUpDetails: SignUpDetails = MOCKED_SIGN_UP_DETAILS;

      authRepository.signUp(signUpDetails).subscribe((user: User): void => {
        expect(user).toEqual(MOCKED_USER);

        done();
      });

      const signUpRequest: TestRequest = httpMock.expectOne({
        method: RepositoryRequestMethods.Post,
        url: `${environment.apiUrl}/${ApiUrls.SignUp}`,
      });

      expect(signUpRequest.request.method).toEqual(RepositoryRequestMethods.Post);
      signUpRequest.flush(MOCKED_USER);

      httpMock.verify();
    });

    it('should throw error when post user request fails', (done: DoneFn): void => {
      const signUpDetails: SignUpDetails = MOCKED_SIGN_UP_DETAILS;
      const errorText: string = 'ERROR';

      authRepository.signUp(signUpDetails).subscribe(
        (): null => null,
        (err: HttpErrorResponse): void => {
          expect(err.statusText).toEqual(errorText);

          done();
        });

      const signUpRequest: TestRequest = httpMock.expectOne({
        method: RepositoryRequestMethods.Post,
        url: `${environment.apiUrl}/${ApiUrls.SignUp}`,
      });

      signUpRequest.error(new ErrorEvent(errorText), { statusText: errorText });
    });
  });

  describe('verifyEmail', (): void => {
    it('should return email details', (done: DoneFn): void => {
      authRepository.verifyEmail(MOCKED_USER.email).subscribe((verifyEmail: VerifyEmail): void => {
        expect(verifyEmail).toEqual(MOCKED_VERIFY_EMAIL);

        done();
      });

      const verifyEmailRequest: TestRequest = httpMock.expectOne(
        `${ApiUrls.VerifyEmail}?access_key=${environment.verifyEmailAccessKey}&email=${MOCKED_USER.email}`,
      );

      verifyEmailRequest.flush(MOCKED_VERIFY_EMAIL);

      httpMock.verify();
    });

    it('should throw error when post user request fails', (done: DoneFn): void => {
      const errorText: string = 'ERROR';

      authRepository.verifyEmail(MOCKED_USER.email).subscribe(
        (): null => null,
        (err: HttpErrorResponse): void => {
          expect(err.statusText).toEqual(errorText);

          done();
        });

      const verifyEmailRequest: TestRequest = httpMock.expectOne(
        `${ApiUrls.VerifyEmail}?access_key=${environment.verifyEmailAccessKey}&email=${MOCKED_USER.email}`,
      );

      verifyEmailRequest.error(new ErrorEvent(errorText), { statusText: errorText });
    });
  });
});
