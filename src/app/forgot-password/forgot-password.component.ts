import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string;
  isError: boolean;

  
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.message = '';
    this.isError = false;
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.http.post('http://localhost:9992/forgot-password', { email })
        .subscribe(
          response => {
            // Handle success response
            this.message = 'Email successfully sent. Please check your email for further instructions';
            this.isError = false;
          },
          error => {
            // Handle error response
            if (error.status === 400) {
              this.message = 'Email not found in database';
            } else {
              this.message = 'Email not found in database';
            }
            this.isError = true;
          }
        );
    }
  }
}
