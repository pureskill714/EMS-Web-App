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
      const bodyData = { token: token };

      // Send POST request to backend for account password change
      this.http.post<any>('http://localhost:9992/reset-password', bodyData).subscribe(
        () => {
          // Handle successful verification (e.g., show success message)
          console.log('Account password changed successfully!');
        },
        error => {
          // Handle verification error (e.g., show error message)
          console.error('Error changing account password:', error);
        }
      );
    });
  }

}
