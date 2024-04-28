import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private errorMessageSouce = new BehaviorSubject<string>('');
  currentErrorMessage = this.errorMessageSouce.asObservable();

  constructor() {}

  // Change message type
  changeErrorMessage(message: string) {
    this.errorMessageSouce.next(message);
  }
}
