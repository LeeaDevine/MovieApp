import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  // Globals
  loading = false;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {
    this.errorHandler.currentErrorMessage.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  // Register Form Builder
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * @description Submit Register Form
   */
  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      const { email, password } = this.registerForm.value;
      this.authService
        .register(email!, password!)
        .then(() => {
          console.log('Registeration and subscriptions setup complete');
        })
        .catch((error) => {
          console.error('Register failed', error);
        });
      this.loading = false;
    } else {
      this.errorHandler.changeErrorMessage('Form is not valid');
    }
  }

  /**
   * @description Get Email Error Messages
   * @returns error message: string
   */
  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.email.hasError('email')
      ? 'Not a valid email address'
      : 'An unknown error has occured';
  }

  /**
   * @description Get Password Error Messages
   * @returns error message: string
   */
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
