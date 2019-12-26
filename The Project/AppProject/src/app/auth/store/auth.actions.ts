import { Action } from '@ngrx/store';
import { START_EDIT } from 'src/app/shopping-list/store/shopping-list.actions';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
   readonly type = LOGIN;

   constructor(public payload: {
      email: string,
      userId: string,
      token: string,
      expirationDate: Date }
   ) {}
}

export class Logout implements Action {
   readonly type = LOGOUT;
}

export class LoginStart implements Action {
   readonly type = LOGIN_START;

   constructor(public payload: { email: string, password: string }) {}
}

export type AuthActions = Login | Logout;