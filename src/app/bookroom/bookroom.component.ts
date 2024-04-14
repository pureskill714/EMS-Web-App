import { Component } from '@angular/core';
import { UserDataService } from './../user-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
  styleUrl: './bookroom.component.css'
})
export class BookroomComponent {
  retrievedBookingInfos: any = [];

  constructor(private userDataService: UserDataService, private http: HttpClient) {
    this.getBookingInfos(); 
  }

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

  getBookingInfos(): void {
    let bodyData = {
      "email": this.userDataService.getEmail(),
    };

    this.http.post<any>('http://localhost:9992/retrievebookinginfos', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            console.log('Data received:', resultData.bookings);
            this.retrievedBookingInfos = resultData.bookings;
            console.log(this.retrievedBookingInfos);

          } else {
            // Error: Handle error
            console.log('Failed to retrieve data:', resultData.message);
          }
        },
        (error) => {
          // Error: Handle HTTP error
          console.error('Error retrieving data:', error);
        }
      );
  }
}


