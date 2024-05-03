import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/service/error-handler.service';
import { SubscriptionsService } from '../../account/services/subscriptions.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private errorHandler: ErrorHandlerService
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
        console.log(res);

        // Navigate back to homepage
        this.router.navigate(['']);
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

        // Navigate back to homepage
        this.router.navigate(['']);
      })
      .catch((error) => {
        // this.errorHandler.changeErrorMessage(error.message);
        let errorMessage = '';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No account found with this email address';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password provided';
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
    this.router.navigate(['']);
  }
}
