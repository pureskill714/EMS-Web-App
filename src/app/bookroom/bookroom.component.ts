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
  retrievedPastBookingInfos : any = [];
  retrievedMeetingRoomOneCalendarInfos: any = [];
  retrievedMeetingRoomTwoCalendarInfos: any = [];

  meetingRoomOneCalendartimeSlotsArray: string[] = [];
  meetingRoomTwoCalendartimeSlotsArray: string[] = [];

  retrievedCalendarDetailsMeetingRoomOne: any = [];
  retrievedCalendarDetailsMeetingRoomTwo: any = [];

  meetingRoomOneSelected : boolean = false;
  meetingRoomTwoSelected : boolean = false;

  retrievedMeetingRoomNames : any = [];
  meetingRoomNames : string[] = []; 
  

  timeSlots: string[] = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'];

  meetingRooms : any = [];

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

    this.http.get("http://localhost:9992/getmeetingrooms").subscribe(
        (resultData: any) => {
          console.log(resultData);
  
          // Check if the response contains data and handle accordingly
        if (resultData) {
          console.log("retrieved meeting room names success");
          this.retrievedMeetingRoomNames = resultData
          console.log(this.retrievedMeetingRoomNames);
          console.log(this.retrievedMeetingRoomNames[0].name);

        // Loop through each object in the array
        for (let i = 0; i < this.retrievedMeetingRoomNames.length; i++) {
          // Extract the name property and add it to the string list
          this.meetingRoomNames.push(this.retrievedMeetingRoomNames[i].name);
        }

        console.log(this.meetingRoomNames);

        // Loop through each meeting room name
        this.meetingRoomNames.forEach(name => {
          // Create a meeting room object with the name and an empty calendarInfos array
          const meetingRoom = { name: name, calendarInfos: [''] };

          // Add the meeting room object to the meetingRooms array
          this.meetingRooms.push(meetingRoom);
        });
        
        console.log(this.meetingRooms)

        }
        else {
          console.log("retrieved meeting room names failed");
        }
      }
      );

  }

  toggleCalendarView(): void {
    console.log('Selected date:', this.selectedDate);
    this.meetingRoomOneSelected = false;
    this.meetingRoomTwoSelected = false;
    this.showCalendarView = true;
    this.showBookingList = false;
    this.showPastBookings = false;

    //this.meetingRooms = [];

    this.retrievedCalendarDetailsMeetingRoomOne  = [];
    this.retrievedCalendarDetailsMeetingRoomTwo  = [];

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

            this.retrievedMeetingRoomOneCalendarInfos = meetingRoom1Array
            this.retrievedMeetingRoomTwoCalendarInfos = meetingRoom2Array

            if (meetingRoom1Array === undefined || meetingRoom1Array.length === 0) {
              console.log("meetingRoom1Array is empty")
              this.retrievedMeetingRoomOneCalendarInfos = [];
          } else {
            console.log("meetingRoom1Array is NOT empty")
            this.retrievedMeetingRoomOneCalendarInfos = meetingRoom1Array;
           
          }

          if (meetingRoom2Array === undefined || meetingRoom2Array.length === 0) {
            console.log("meetingRoom2Array is empty")
            this.retrievedMeetingRoomTwoCalendarInfos = [];
        } else {
          console.log("meetingRoom2Array is NOT empty")
          this.retrievedMeetingRoomTwoCalendarInfos = meetingRoom2Array;
         
        }


            this.meetingRooms = [
              { name: 'Meeting Room 1', calendarInfos: this.retrievedMeetingRoomOneCalendarInfos },
              { name: 'Meeting Room 2', calendarInfos: this.retrievedMeetingRoomTwoCalendarInfos },
              { name: 'Meeting Room 3', calendarInfos: [''] }
            ]; 
          }
        });
        
        this.http.post<any>('http://localhost:9992/retrievecalendarmeetingroom1details', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            console.log('Calendar details received (Meeting Room 1):', resultData);
            this.retrievedCalendarDetailsMeetingRoomOne = resultData.calendarDetailsMeetingRoomOne;
            console.log(this.retrievedCalendarDetailsMeetingRoomOne);
           
          }
        });

        this.http.post<any>('http://localhost:9992/retrievecalendarmeetingroom2details', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            console.log('Calendar details received (Meeting Room 2):', resultData);
            this.retrievedCalendarDetailsMeetingRoomTwo = resultData.calendarDetailsMeetingRoomTwo;
            console.log(this.retrievedCalendarDetailsMeetingRoomTwo);
           
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

    let bodyData = {
      "email": this.userDataService.getEmail(),
    };

    this.http.post<any>('http://localhost:9992/retrievepastbookinginfos', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            console.log('Data received (past booking views):', resultData.bookings);
            this.retrievedPastBookingInfos = resultData.bookings;
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
        




