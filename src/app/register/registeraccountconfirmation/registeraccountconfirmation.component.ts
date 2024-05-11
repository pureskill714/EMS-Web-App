import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeraccountconfirmation',
  templateUrl: './registeraccountconfirmation.component.html',
  styleUrl: './registeraccountconfirmation.component.css'
})
export class RegisteraccountconfirmationComponent {

  constructor(private router: Router) {
    
  }

  returnToBookingPage(): void {
    this.router.navigate(['/']);
  }

}
