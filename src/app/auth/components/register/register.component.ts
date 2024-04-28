import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService
  ) {
    this.errorHandler.currentErrorMessage.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
    } else {
      this.errorHandler.changeErrorMessage('Form is not valid');
    }
  }

  // Validation Check - Email
  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.email.hasError('email')
      ? 'Not a valid email address'
      : 'An unknown error has occured';
  }

  // Validation Check - Password
  getPasswordErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.registerForm.controls.password.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return 'An unknown error has occured';
  }
}
