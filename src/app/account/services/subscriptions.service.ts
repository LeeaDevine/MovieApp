import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  storeSubscriptions(userId: string | undefined, subscriptions: string[]) {
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

  getSubscriptions(userId: string | undefined) {
    this.http.get(
      'https://movieapp-88c1e-default-rtdb.europe-west1.firebasedatabase.app/users/' +
        userId +
        '/subscriptions.json'
    );
  }
}
