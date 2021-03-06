import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

   canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
      return this.store.select('auth').pipe(
         take(1),
         map(authState => {
            return authState.user
         }),
         map(user => {
            const isAuth = !!user;

            if (isAuth) {
               return true;
            }

            return this.router.createUrlTree(['/auth']);
         })
      );
   }
}


// PREVIOUS METHOD OF REDIRECT BEFORE ANGULAR UPDATED WITH URL TREE:
// export class AuthGuard implements CanActivate {
//    constructor(private authService: AuthService, private router: Router) {}

//    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
//       return this.authService.user.pipe(
//          take(1),
//          map(user => {
//             return !!user;
//          }),
//          tap(isAuth => {
//             if (!isAuth) {
//                this.router.navigate(['/auth']);
//             }
//          })
//       );
//    }
// }