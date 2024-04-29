import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth) {}

  /**
   * @description routeGuard - determine user views based on authentication
   * @param route
   * @param state
   * @returns depending on user status
   * allow access or redirect user
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.auth.authState.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true; // User is logged in, allow access
        } else {
          return this.router.createUrlTree(['/login']); // User is not logged in, redirect to login
        }
      })
    );
  }
}
