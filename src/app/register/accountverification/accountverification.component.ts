import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountverification',
  templateUrl: './accountverification.component.html',
  styleUrl: './accountverification.component.css'
})
export class AccountverificationComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];

      // Create a request body containing the verification token
      const bodyData = { token: token };

      // Send POST request to backend for account verification
      this.http.post<any>('http://134.122.17.14/api/verify-account', bodyData).subscribe(
        () => {
          // Handle successful verification (e.g., show success message)
          console.log('Account verified successfully!');
        },
        error => {
          // Handle verification error (e.g., show error message)
          console.error('Error verifying account:', error);
        }
      );
    });
  }

  returnToHomePage(): void {
    this.router.navigate(['/']);
  }

  

}
