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
  date: string | null = null;
  room: string | null = null;
  timeSlots: string[] | null = null;

  constructor(private router: Router,private userDataService: UserDataService,private authService: AuthService) {
    this.date = this.userDataService.getSelectedBookingDate();
    this.room = this.userDataService.getSelectedBookingRoom();
    this.timeSlots = this.userDataService.getSelectedTimeSlots();
  }

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
