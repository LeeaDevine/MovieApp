import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSubscriptions } from '../../movie/models/movie.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(private http: HttpClient) {}

  /**
   * @description Store subscriptions to Firebase DB - Update subscriptions
   * @param userId
   * @param subscriptions
   */
  storeSubscriptions(
    userId: string | undefined,
    subscriptions: UserSubscriptions
  ) {
    this.http
      .put(
        'https://movieapp-88c1e-default-rtdb.europe-west1.firebasedatabase.app/users/' +
          userId +
          '/subscriptions.json',
        subscriptions
      )
      .subscribe({
        next: (response) => console.log('Subscriptions stored: ', response),
        error: (response) =>
          console.error('Failed to store subscriptions: ', response),
      });
  }

  /**
   * @description fetch userid -> user subscriptions from firebase
   * @param userId
   * @returns user scriptions or null
   */
  getSubscriptions(
    userId: string | undefined | null
  ): Observable<UserSubscriptions | null> {
    if (userId) {
      return this.http.get<UserSubscriptions>(
        'https://movieapp-88c1e-default-rtdb.europe-west1.firebasedatabase.app/users/' +
          userId +
          '/subscriptions.json'
      );
    } else {
      console.error('User id is required.');
      return of(null);
    }
  }
}
