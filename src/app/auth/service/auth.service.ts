import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/service/error-handler.service';
import { SubscriptionsService } from '../../account/services/subscriptions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private subscriptionService: SubscriptionsService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @description Register account to firebaseDB
   * @param email
   * @param password
   * @returns email, password from successful form submit
   */
  register(email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // Send over default states for subscription with new account
        const defaultSubscriptions = {
          netflix: false,
          skyGo: false,
          nowTV: false,
          amazonVideo: false,
          disneyPlus: false,
        };

        // store in firebase
        this.subscriptionService.storeSubscriptions(
          res.user?.uid,
          defaultSubscriptions
        );

        // Feedback to user
        this.snackBar.open('Registration Sucess', 'close', {
          duration: 3000,
          verticalPosition: 'top',
        });

        // Navigate back to login
        this.router.navigate(['./login']);
      })
      .catch((error) => {
        // this.errorHandler.changeErrorMessage(error.message);
        let errorMessage = 'An unknown error occurred. Please try again later.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'An account already exists with this email address.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'The provided email address is invalid.';
        }
        this.errorHandler.changeErrorMessage(errorMessage); // Use the error handler to broadcast the error message
        return Promise.reject(error); // Re-throw the error to not disrupt the error flow
      });
  }

  /**
   * @description Get Login information
   * @param email
   * @param password
   * @returns
   */
  login(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);

        // Feedback to user
        this.snackBar.open('Login Success', 'close', {
          duration: 3000,
          verticalPosition: 'top',
        });

        // Navigate back to account - select services
        this.router.navigate(['./account']);
      })
      .catch((error) => {
        // this.errorHandler.changeErrorMessage(error.message);
        let errorMessage = '';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No account found with this email address';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password provided';
        } else if (error.code === 'auth/invalid-credential') {
          errorMessage = 'Incorrect credentials';
        }
        this.errorHandler.changeErrorMessage(errorMessage); // Use the error handler to broadcast the error message
        return Promise.reject(error); // Re-throw the error to not disrupt the error flow
      });
  }

  /**
   * @description Logout user
   * Navigate to Homepage
   */
  logout() {
    this.auth.signOut();

    // Feedback to user
    this.snackBar.open('Logout Complete', 'close', {
      duration: 3000,
      verticalPosition: 'top',
    });

    // Navigate to homepage - remove authenicated tag
    this.router.navigate(['']);
  }

  // get the current user id
  getCurrentUserId(): Observable<string | null> {
    return this.auth.authState.pipe(map((user) => (user ? user.uid : null)));
  }
}
