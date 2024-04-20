import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-bookingconfirmation',
  templateUrl: './bookingconfirmation.component.html',
  styleUrl: './bookingconfirmation.component.css'
})
export class BookingconfirmationComponent {
  date: string = '30-4-2024';
  meetingRoom: string = 'Meeting Room 1';
  timeSlots: string[] = ['09:00 - 10:00', '13:00 - 14:00'];

  constructor(private router: Router,private userDataService: UserDataService,private authService: AuthService) {}

  ngOnInit() {
    const userData = this.authService.getUserData();
    if (userData) {
      const { email, firstName, lastName } = userData;
      this.userDataService.setFirstName(userData.firstName);
      this.userDataService.setLastName(userData.lastName);
      this.userDataService.setEmail(userData.email);
    } else {
      alert("THIS IS FAIL")
    }
  }

  returnToBookingPage(): void {
    this.router.navigate(['/booking']);
  }

}
