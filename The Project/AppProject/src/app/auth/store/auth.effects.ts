import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from "@ngrx/effects";
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';

export interface AuthResponseData {
   idToken: string;
   email: string;
   refreshToken: string;
   expiresIn: string;
   localId: string;
   registered?: boolean;
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
   return new AuthActions.AuthenticateSuccess({ email: email, userId: userId, token: token, expirationDate: expirationDate });
}

const handleError = (errorRes: any) => {
   let errorMessage = 'An unknown error occurred!';

   if (!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.AuthenticateFail(errorMessage));
   }

   switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
         errorMessage = 'This email already exists.';
         break;
      case 'EMAIL_NOT_FOUND':
         errorMessage = 'This email does not exists.';
         break;
      case 'INVALID_PASSWORD':
         errorMessage = 'This password is not correct.';
         break;
   }
   return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
   @Effect()
   authSignup = this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
         return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            { email: signupAction.payload.email, password: signupAction.payload.password, returnSecureToken: true }
         ).pipe(map(resData => {
            return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
         }), catchError(errorRes => {
            return handleError(errorRes);
         }));
      })
   );

   @Effect()
   authLogin = this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
         return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true }
         ).pipe(map(resData => {
            return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
         }), catchError(errorRes => {
            return handleError(errorRes);
         }));
      })
   );

   @Effect({ dispatch: false })
   authRedirect = this.actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
      tap(() => {
         this.router.navigate(['./']);
      })
   );

   constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}