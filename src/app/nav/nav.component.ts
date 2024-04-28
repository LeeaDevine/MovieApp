import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {}

  authenticated = false;
  authSubscription = new Subscription();

  /**
   * @description Check whether user is logged in
   * Show content based on this result
   */
  ngOnInit(): void {
    this.authSubscription = this.auth.authState.subscribe((user) => {
      this.authenticated = user ? true : false;
    });
  }

  /**
   * @description Click event - call logout() method
   */
  onLogout() {
    this.authService.logout();
  }

  /**
   * @description Unsubscribe, Clean up
   */
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
