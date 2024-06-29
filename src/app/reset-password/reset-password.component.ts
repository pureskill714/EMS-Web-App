import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];

      // Create a request body containing the resetToken
      const bodyData = { resetToken: token };

      // Send POST request to backend for account password change
      this.http.post<any>('http://localhost:9992/verifyResetPassword', bodyData).subscribe(
        (response) => {
          // Handle successful verification
          if (response.success) {
            console.log('Reset Token found in DB');
            // Display success message or take appropriate action
          } else {
            console.log('Reset Token not found in DB');
            // Display error message or take appropriate action
          }
        },
        (error) => {
          // Handle verification error
          console.error('Error verifying reset token:', error);
          // Display error message or take appropriate action
        }
      );
    });
  }

}
