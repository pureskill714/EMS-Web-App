import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token: string = '';
  tokenValid: boolean = false;
  message: string = '';
  resetToken: string = '';
  newPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resetToken = params['token'];

      // Create a request body containing the resetToken
      const bodyData = { resetToken: this.resetToken };

      // Send POST request to backend for account password change
      this.http.post<any>('http://58.182.172.239/api/verifyResetPassword', bodyData).subscribe(
        (response) => {
          // Handle successful verification
          if (response.success) {
            console.log('Reset Token found in DB');
            this.tokenValid = true; // Set token valid flag to true
            this.createForm();
          } else {
            console.log('Reset Token not found in DB');
            this.tokenValid = false;
            this.message = 'This link is invalid';
          }
        },
        (error) => {
          // Handle verification error
          console.error('Error verifying reset token:', error);
          this.tokenValid = false;
          this.message = 'This link is invalid';
        }
      );
    });
  }

  createForm(): void {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValidLength = value.length >= 8;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter && isValidLength;

      return !passwordValid ? { passwordInvalid: true } : null;
    };
  }

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      const confirmPassword = this.resetPasswordForm.value.confirmPassword;

      // Implement the reset password logic here
      console.log('New Password:', newPassword);
      console.log('Confirm Password:', confirmPassword);
      this.message = 'Password reset successfully';

      this.newPassword = newPassword;

      
      //update backend DB, need body of token and password
      let bodyData = {
        resetToken: this.resetToken,
        newPassword: this.newPassword,
      };
  
      this.http.post("http://58.182.172.239/api/resetPassword", bodyData).subscribe(
        (resultData: any) => {

          console.log(resultData);
  
            if (resultData.status) {
              console.log('Reset password success:', resultData);
            }
            else {
              // Error: Handle error
              console.log('Reset password failed:', resultData.message);
            }
          },
          (error) => {
            // Error: Handle HTTP error
            console.error('(HTTP error) Reset password failed', error);
            alert('(HTTP error) Reset password failed');
        });

    } else {
      this.message = 'Form is invalid';
    }
  }
}



