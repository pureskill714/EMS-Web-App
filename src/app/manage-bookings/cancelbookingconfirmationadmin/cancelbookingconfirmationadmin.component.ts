import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-cancelbookingconfirmationadmin',
  templateUrl: './cancelbookingconfirmationadmin.component.html',
  styleUrl: './cancelbookingconfirmationadmin.component.css'
})
export class CancelbookingconfirmationadminComponent {
  date: string | null = null;
  room: string | null = null;
  timeSlots: string[] | null = null;

  constructor(private router: Router,private userDataService: UserDataService) {
    this.date = this.userDataService.getCancelledDate();
    this.room = this.userDataService.getCancelledRoom();
    this.timeSlots = this.userDataService.getCancelledTimeSlots();
  }

  returnToBookingPage(): void {
    this.router.navigate(['/manage-bookings']);
  }

  

}
