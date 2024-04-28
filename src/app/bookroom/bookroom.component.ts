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

  meetingRoomOneSelected : boolean = false;
  meetingRoomTwoSelected : boolean = false;

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
    this.meetingRoomOneSelected = false;
    this.meetingRoomTwoSelected = false;
    this.showCalendarView = true;
    this.showBookingList = false;
    this.showPastBookings = false;

    this.meetingRooms = [
      { name: 'Meeting Room 1', calendarInfos: [''] },
      { name: 'Meeting Room 2', calendarInfos: [''] }
    ];

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

            // Extract array data for Meeting Room 1
            const meetingRoom1Array = resultData.calendarInfo["Meeting Room 1"];
            console.log("Meeting Room 1 timeslots:", meetingRoom1Array);

            const meetingRoom2Array = resultData.calendarInfo["Meeting Room 2"];
            console.log("Meeting Room 2 timeslots:", meetingRoom2Array);

            this.meetingRooms = [
              { name: 'Meeting Room 1', calendarInfos: meetingRoom1Array },
              { name: 'Meeting Room 2', calendarInfos: meetingRoom2Array }
            ]; 


          }

        });
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

    showMeetingRoomOneDetails(): void {
      this.meetingRoomOneSelected = !this.meetingRoomOneSelected;
    }
  
    showMeetingRoomTwoDetails(): void {
      this.meetingRoomTwoSelected = !this.meetingRoomTwoSelected;
    }

  }
        




