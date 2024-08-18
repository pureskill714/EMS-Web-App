import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nonverifiedaccountmessage',
  templateUrl: './nonverifiedaccountmessage.component.html',
  styleUrl: './nonverifiedaccountmessage.component.css'
})
export class NonverifiedaccountmessageComponent {

  constructor(private router: Router, private userDataService: UserDataService,private http: HttpClient) {
    
  }

  returnToHomePage(): void {
    this.router.navigate(['/']);
  }

  resendVerificationEmail(): void {
    let bodyData = {
      email: this.userDataService.getEmail()
    };

    console.log(this.userDataService.getEmail());
    // Send POST request to backend for account verification
    this.http.post<any>('http://192.168.10.110:9992/resend-verification', bodyData).subscribe(
      () => {
        // Handle successful verification (e.g., show success message)
        alert("Email verification email successfully resent! Please check your email.")
        console.log('Email verification email successfully resent!');
      },
      error => {
        // Handle verification error (e.g., show error message)
        alert("Error resending verification email. Please contact system administrator.")
        console.error('Error resending verification email:', error);
      }
    );
  }

}
