import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../auth/service/auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit, OnDestroy {
  subscriptionForm!: FormGroup;
  private userSubscriptions!: Subscription;

  constructor(
    private subscriptionService: SubscriptionsService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Initialise the form with all subscriptions options
    this.subscriptionForm = this.formBuilder.group({
      netflix: false,
      skyGo: false,
      nowTV: false,
      amazonVideo: false,
      disneyPlus: false,
    });
  }

  ngOnInit(): void {
    this.userSubscriptions = this.authService
      .getCurrentUserId()
      .subscribe((userId) => {
        if (userId) {
          // User logged in
          this.loadUserScriptions(userId);
        } else {
          console.error('User Id is null');
        }
      });
  }

  /**
   * @description fetch userSubscriptions - load results
   * @param userId
   */
  private loadUserScriptions(userId: string) {
    this.subscriptionService
      .getSubscriptions(userId)
      .subscribe((subscriptions) => {
        if (subscriptions) {
          this.subscriptionForm.patchValue(subscriptions);
        }
      });
  }

  /**
   * @description on button submit - update current list with new subscriptions.
   */
  onSubmit() {
    if (this.subscriptionForm.valid) {
      const userId = this.authService.getCurrentUserId();
      userId.subscribe((uid) => {
        if (uid) {
          this.subscriptionService.storeSubscriptions(
            uid,
            this.subscriptionForm.value
          );
        }
      });

      // Feedback to user
      this.snackBar.open('Saved Changes to Account', 'close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }

  /**
   * @description remove subscription.
   */
  ngOnDestroy(): void {
    // Avoid memory leaks.
    this.userSubscriptions.unsubscribe();
  }
}
