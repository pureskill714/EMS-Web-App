import { Component } from '@angular/core';
import { UserDataService } from './../user-data.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookingCancellationDialogAdminComponent } from './booking-cancellation-dialog-admin/booking-cancellation-dialog-admin.component';

// Define an interface for the slot structure
interface Slot {
  firstName: string;
  lastName: string;
  purpose: string;
}

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.css'
})
export class ManageBookingsComponent {
  retrievedBookingInfos: any = [];
  retrievedPastBookingInfos : any = [];

  retrievedCalendarDetailsMeetingRoomOne: any = [];
  retrievedCalendarDetailsMeetingRoomTwo: any = [];

  meetingRoomOneSelected : boolean = false;
  meetingRoomTwoSelected : boolean = false;

  retrievedMeetingRoomNames : any = [];
  meetingRoomNames : string[] = [];
  
  timeSlots: string[] = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'];

  meetingRooms : any = [];
  retrievedAllMeetingRoomDetails : any = [];

  retrievedCalendarInfoWithNames : any = [];
  roleCheck: string | null = null;

  constructor(private userDataService: UserDataService, private http: HttpClient, private location: Location,
    private authService: AuthService,private router: Router,private dialog: MatDialog) {

    this.roleCheck = this.userDataService.getRole();

    if (this.roleCheck != "admin") {
        this.router.navigate(["not-authorized"]);
        this.authService.kickUser(); // Call AuthService kick user method
    }
    else {
      this.getBookingInfos();
    }
  }

  showCalendarView: boolean = false;
  showBookingList: boolean = true;
  showPastBookings: boolean = false;
  selectedDate: Date | null = null;
  selectedMeetingRooms: boolean[] = [];

  ngOnInit() {
    const userData = this.authService.getUserData();
    if (userData) {
      const { email, firstName, lastName } = userData;
      this.userDataService.setFirstName(userData.firstName);
      this.userDataService.setLastName(userData.lastName);
      this.userDataService.setEmail(userData.email);
    } else {
       this.router.navigate(["not-authorized"])
    }

    this.http.get("http://134.122.17.14/api/getmeetingrooms").subscribe(
        (resultData: any) => {
          console.log(resultData);
  
          // Check if the response contains data and handle accordingly
        if (resultData) {
          console.log("retrieved meeting room names success");
          this.retrievedMeetingRoomNames = resultData
          console.log(this.retrievedMeetingRoomNames);

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

    this.meetingRooms = [];

     // Loop through each meeting room name
     this.meetingRoomNames.forEach(name => {
      // Create a meeting room object with the name and an empty calendarInfos array
      const meetingRoom = { name: name, calendarInfos: [''] };

      // Add the meeting room object to the meetingRooms array
      this.meetingRooms.push(meetingRoom);
    });

    let bodyData = {
      "date": this.selectedDate,
    };

    this.http.post<any>('http://134.122.17.14/api/retrievecalendarinfos', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            console.log('Calendar data received:', resultData);

            const meetingRooms : any = []; // Initialize an empty array to store meeting rooms

            // Iterate through each meeting room name and construct the meeting room object
            this.meetingRoomNames.forEach(name => {
              // Extract array data for the current meeting room
              const calendarInfoArray = resultData.calendarInfo[name] || []; // Use default empty array if data is undefined
    
              // Push the meeting room object into the meetingRooms array
              meetingRooms.push({ name: name, calendarInfos: calendarInfoArray });
            });
    
            // Update the meetingRooms property with the dynamically created array
            this.meetingRooms = meetingRooms;
          }
        });

        this.http.post<any>('http://134.122.17.14/api/retrievecalendarinfoswithnames', bodyData)
        .subscribe(
          (resultData: any) => {
            console.log(resultData);
  
            if (resultData.status) {
              console.log('Calendar data (with names) received:', resultData);
              this.retrievedCalendarInfoWithNames = resultData;
            }
          });
        
        this.http.post<any>('http://134.122.17.14/api/retrievecalendarmeetingroomdetails', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log("received all meeting room details")
          console.log(resultData);
          //console.log(resultData[0]);
          this.retrievedAllMeetingRoomDetails = resultData;
          console.log(this.retrievedAllMeetingRoomDetails[0].bookings[0].date)
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

    this.http.post<any>('http://134.122.17.14/api/retrievepastbookinginfos', bodyData)
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

    this.http.post<any>('http://134.122.17.14/api/retrievebookinginfos', bodyData)
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


    const dialogRef = this.dialog.open(BookingCancellationDialogAdminComponent, {
      width: '420px',
      panelClass: 'custom-dialog-container', // Custom CSS class for dialog container
      hasBackdrop: true, // Display backdrop behind the dialog
      backdropClass: 'custom-backdrop', // Custom CSS class for backdrop
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        // Call your backend service to cancel the booking
        this.http.post<any>('http://134.122.17.14/api/cancelbooking', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            console.log('Cancel booking success:', resultData);
            //alert('Cancel booking success');
            this.router.navigate(['/cancelbooking-admin']);
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

    showMeetingRoomDetails(index: number) {
      // Toggle the selected state for the clicked meeting room
      this.selectedMeetingRooms[index] = !this.selectedMeetingRooms[index];
  
      // Optionally: Add your logic to handle displaying meeting room details
      console.log(`Showing details for ${this.meetingRoomNames[index]}`);
    }

    getNextAvailableSlot(slots: Slot[] | undefined, startIndex: number) {
      if (!slots) return null;
      for (let i = startIndex; i < slots.length; i++) {
        if (slots[i]) {
          return slots[i];
        }
      }
      return null;
    }

}
