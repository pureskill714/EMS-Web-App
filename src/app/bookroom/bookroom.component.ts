import { Component } from '@angular/core';
import { UserDataService } from './../user-data.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookingCancellationDialogComponent } from './booking-cancellation-dialog/booking-cancellation-dialog.component';


@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
  styleUrl: './bookroom.component.css'
})
export class BookroomComponent {
  retrievedBookingInfos: any = [];
  retrievedMeetingRoomOneCalendarInfos: any = [];
  retrievedMeetingRoomTwoCalendarInfos: any = [];

  meetingRoomOneCalendartimeSlotsArray: string[] = [];
  meetingRoomTwoCalendartimeSlotsArray: string[] = [];

  timeSlots: string[] = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'];

  meetingRooms = [
    { name: 'Meeting Room 1', calendarInfos: [''] },
    { name: 'Meeting Room 2', calendarInfos: [''] }
  ];

  constructor(private userDataService: UserDataService, private http: HttpClient, private location: Location,
    private authService: AuthService,private router: Router,private dialog: MatDialog) {
    this.getBookingInfos();
  }

  showCalendarView: boolean = false;
  showBookingList: boolean = true;
  showPastBookings: boolean = false;
  selectedDate: Date | null = null;

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

  toggleCalendarView(): void {
    console.log('Selected date:', this.selectedDate);
    this.showCalendarView = true;
    this.showBookingList = false;
    this.showPastBookings = false;

    this.meetingRooms = [
      { name: 'Meeting Room 1', calendarInfos: [''] },
      { name: 'Meeting Room 2', calendarInfos: [''] }
    ];

    this.retrievedMeetingRoomOneCalendarInfos = [];
    this.retrievedMeetingRoomTwoCalendarInfos = [];

    this.meetingRoomOneCalendartimeSlotsArray = [];
    this.meetingRoomTwoCalendartimeSlotsArray = [];

    let bodyData = {
      "date": this.selectedDate,
      //"email": this.userDataService.getEmail(),
    };

    this.http.post<any>('http://localhost:9992/retrievecalendarinfos', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            console.log('Calendar data received:', resultData);

            this.retrievedMeetingRoomOneCalendarInfos = resultData.calendarInfo[0].timeslots;
            console.log("retrievedMeetingRoomOneCalendarInfos : " + this.retrievedMeetingRoomOneCalendarInfos);

            this.retrievedMeetingRoomTwoCalendarInfos = resultData.calendarInfo[1].timeslots;
            console.log("retrievedMeetingRoomTwoCalendarInfos : " + this.retrievedMeetingRoomTwoCalendarInfos);

            // Loop through the properties of the object
            for (let key in this.retrievedMeetingRoomOneCalendarInfos) {
              // Check if the property is not inherited from the prototype chain
              if (this.retrievedMeetingRoomOneCalendarInfos.hasOwnProperty(key)) {
                  // Concatenate the values of each property to the array
                  this.meetingRoomOneCalendartimeSlotsArray = this.meetingRoomOneCalendartimeSlotsArray.concat(this.retrievedMeetingRoomOneCalendarInfos[key]);
              }
            }

            // Loop through the properties of the object
            for (let key in this.retrievedMeetingRoomTwoCalendarInfos) {
              // Check if the property is not inherited from the prototype chain
              if (this.retrievedMeetingRoomTwoCalendarInfos.hasOwnProperty(key)) {
                  // Concatenate the values of each property to the array
                  this. meetingRoomTwoCalendartimeSlotsArray = this. meetingRoomTwoCalendartimeSlotsArray.concat(this.retrievedMeetingRoomTwoCalendarInfos[key]);
              }
            }

            console.log("Time slots array (meeting room 1): " + this.meetingRoomOneCalendartimeSlotsArray);
            console.log("Time slots array (meeting room 2): " + this.meetingRoomTwoCalendartimeSlotsArray);

            this.meetingRooms = [
              { name: 'Meeting Room 1', calendarInfos: this.meetingRoomOneCalendartimeSlotsArray },
              { name: 'Meeting Room 2', calendarInfos: this.meetingRoomTwoCalendartimeSlotsArray }
            ];


          } else {
            // Error: Handle error
            console.log('Failed to retrieve calendar data:', resultData.message);
          }
        },
        (error) => {
          // Error: Handle HTTP error
          console.error('Error retrieving calendar data:', error);
        }
      );

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

  isTimeSlotOccupied(calendarInfos: string[], timeSlot: string): boolean {
    return calendarInfos.includes(timeSlot);
  }

  cancelBooking(bookingId: string, cancelledDate: string, cancelledRoom: string,cancelledTimeSlots: string[], cancelledPurpose:string) {
    this.userDataService.setCancelledDate(cancelledDate);
    this.userDataService.setCancelledRoom(cancelledRoom);
    this.userDataService.setCancelledTimeSlots(cancelledTimeSlots);
    this.userDataService.setCancelledPurpose(cancelledPurpose);
    
    let bodyData = {
      "id": bookingId,
    };


    const dialogRef = this.dialog.open(BookingCancellationDialogComponent, {
      width: '420px',
      panelClass: 'custom-dialog-container', // Custom CSS class for dialog container
      hasBackdrop: true, // Display backdrop behind the dialog
      backdropClass: 'custom-backdrop', // Custom CSS class for backdrop
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        // Call your backend service to cancel the booking
        this.http.post<any>('http://localhost:9992/cancelbooking', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            console.log('Cancel booking success:', resultData);
            //alert('Cancel booking success');
            this.router.navigate(['/cancelbooking']);
          }
          else {
            // Error: Handle error
            console.log('Cancel booking failed:', resultData.message);
            //alert('Cancel booking failed:');
          }
        },
        (error) => {
          // Error: Handle HTTP error
          console.error('(HTTP error) Cancel booking failed', error);
          alert('(HTTP error) Cancel booking failed');
        })  
      }
      else{
        console.log("Booking was not cancelled")
      }
    })     
    }
  }
        




