import { Component } from '@angular/core';

@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
  styleUrl: './bookroom.component.css'
})
export class BookroomComponent {
  showCalendarView: boolean = false;
  showBookingList: boolean = true;
  showPastBookings: boolean = false;
  selectedDate: Date | null = null;

  toggleCalendarView(): void {
    this.showCalendarView = true;
    this.showBookingList = false;
    this.showPastBookings = false;
  }

  loadBookingList(): void {
    this.showBookingList = true;
    this.showCalendarView = false;
    this.showPastBookings = false;
  }

  loadPastBookings(): void {
    this.showPastBookings = true;
    this.showBookingList = false;
    this.showCalendarView = false;
  }

}
