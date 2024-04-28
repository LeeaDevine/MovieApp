import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
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

  loading = false;

  // Register Form Builder
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * @description Submit Register Form
   */
  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!);
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
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls.email.hasError('email')
      ? 'Not a valid email address'
      : 'An unknown error has occured';
  }
}
