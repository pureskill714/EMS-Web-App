import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nonverifiedaccountmessage',
  templateUrl: './nonverifiedaccountmessage.component.html',
  styleUrl: './nonverifiedaccountmessage.component.css'
})
export class NonverifiedaccountmessageComponent {

  constructor(private router: Router) {
    
  }

  returnToHomePage(): void {
    this.router.navigate(['/']);
  }

  resendVerificationEmail(): void {
    this.router.navigate(['/']);
  }


}
