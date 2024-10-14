import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BookingConfirmationDialogComponent } from '../booking-confirmation-dialog/booking-confirmation-dialog.component';
import { UserDataService } from '../../user-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrl: './newbooking.component.css'
})
export class NewbookingComponent implements OnInit {
  selectedDate: string | null = null;
  selectedRoom: string | null = null;
  showTimeSlots: boolean = false;
  selectedTimeSlots: string[] = [];
  inputsFilled: boolean = false;
  //retrievedTimeSlots: string[] = [];
  retrievedTimeSlots: string[] = [];
  minDate: string; // Define minDate property

  retrievedMeetingRoomNames : any = [];
  meetingRooms: string[] = []; // Add more rooms as needed
  bookedDetailsSelected : boolean = false;

    // Define your time slots here
  timeSlots: string[] = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00'
  ];

  retrievedCalendarDetails: any[] = []

  ngOnInit(): void {

    this.http.get("http://134.122.17.14/api/getmeetingrooms").subscribe(
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
          this.meetingRooms.push(this.retrievedMeetingRoomNames[i].name);
        }

        console.log(this.meetingRooms);

        }
        else {
          console.log("retrieved meeting room names failed");
        }
      }
      );

  }

  constructor(private dialog: MatDialog,private userDataService: UserDataService,private http: HttpClient,private router: Router) {
    // Initialize minDate to the current date
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

  }

  isSelected(timeSlot: string): boolean {
    console.log(this.selectedTimeSlots);
    return this.selectedTimeSlots.includes(timeSlot);
  }

  toggleTimeSlot(timeSlot: string): void {
    const index = this.selectedTimeSlots.indexOf(timeSlot);
    if (index === -1) {
      // Find the index where the new time slot should be inserted
      let insertIndex = 0;
      while (insertIndex < this.selectedTimeSlots.length && this.selectedTimeSlots[insertIndex] < timeSlot) {
        insertIndex++;
      }
      // Insert the new time slot at the correct index
      this.selectedTimeSlots.splice(insertIndex, 0, timeSlot);
    } else {
      this.selectedTimeSlots.splice(index, 1);
    }
  }
  
  search(): void {
    this.timeSlots = [
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00'
    ];

    this.retrievedCalendarDetails = []
    
    this.showTimeSlots = true;

    let bodyData = {
      "date": this.userDataService.getSelectedBookingDate(),
      "meetingRoom": this.userDataService.getSelectedBookingRoom(),
    };

    this.http.post<any>('http://134.122.17.14/api/retrievebookingtimeslots', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            // Success: Handle received data
            console.log('Data received:', resultData.timeslots);
            this.retrievedTimeSlots = resultData.timeslots;
            this.filterTimeSlots(); // Filter time slots after retrieving data
            console.log('Retrieved Time Slots:', this.retrievedTimeSlots);
            console.log('Filtered Time Slots:', this.timeSlots);

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

      this.http.post<any>('http://134.122.17.14/api/retrievecalendardetails', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);

          if (resultData.status) {
            console.log("booked details retrieved")
            this.retrievedCalendarDetails = resultData.calendarDetails;

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

  checkInputs(): void {
    this.inputsFilled = this.selectedDate !== null && this.selectedRoom !== null;

    this.userDataService.setSelectedBookingDate(this.selectedDate);
    this.userDataService.setSelectedBookingRoom(this.selectedRoom);

    console.log(this.selectedDate);
    console.log(this.selectedRoom);

    if (this.selectedDate === null) {
      this.inputsFilled = false; // Date input is cleared
      this.showTimeSlots = false; // Hide time slots when date is cleared
      this.selectedTimeSlots = [];
      console.log(this.selectedTimeSlots)
    }

    if (this.selectedDate === "") {
      this.inputsFilled = false; // Date input is cleared
      this.showTimeSlots = false; // Hide time slots when date is cleared
      this.selectedTimeSlots = [];
      console.log(this.selectedTimeSlots)
    }

     // Check if the selected date is cleared
  if (this.selectedDate === null || this.selectedDate === "") {
    // Reset selected room to null
    this.selectedRoom = null;
    // Date input is cleared, hide time slots
    this.showTimeSlots = false;
    // Reset selected time slots
    this.selectedTimeSlots = [];
    console.log(this.selectedTimeSlots);
  }

    // Hide time slots when inputs are not filled
    if (!this.inputsFilled) {
      this.showTimeSlots = false;
      console.log("Timeslots array reset")
      this.selectedTimeSlots = [];
    }
  }

  filterTimeSlots(): void {
    console.log('Filtering time slots...');
    // Filter out the time slots that are already retrieved
    this.timeSlots = this.timeSlots.filter(slot => !this.retrievedTimeSlots.includes(slot));
    console.log(this.timeSlots);
  }

  onDateChange(): void {
    // Reset selected room to null when date changes
    this.selectedRoom = null;
    this.showTimeSlots = false;
    this.bookedDetailsSelected = false;
  }

  onRoomChange(): void {
    // Reset selected room to null when date changes
    this.showTimeSlots = false;
    this.bookedDetailsSelected = false;
  }

  onNextButtonClick(): void {
    if (this.selectedTimeSlots.length === 0) {
      window.alert('Please select a timeslot.');
    } else {
      this.userDataService.setSelectedTimeSlots(this.selectedTimeSlots);
      const dialogRef = this.dialog.open(BookingConfirmationDialogComponent, {
        width: '420px',
        panelClass: 'custom-dialog-container', // Custom CSS class for dialog container
        hasBackdrop: true, // Display backdrop behind the dialog
        backdropClass: 'custom-backdrop', // Custom CSS class for backdrop
        data: { selectedDate: this.selectedDate, selectedRoom: this.selectedRoom }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          // Handle the confirmation action
          console.log('Booking confirmed');

          let bodyData = {
            "date": this.userDataService.getSelectedBookingDate(),
            "meetingRoom": this.userDataService.getSelectedBookingRoom(),
            "purpose": this.userDataService.getInputBookingPurpose(),
            "timeslots": this.userDataService.getSelectedTimeSlots(),
            "email": this.userDataService.getEmail(),
            "firstName": this.userDataService.getFirstName(),
            "lastName": this.userDataService.getLastName()
        };

          this.http.post("http://134.122.17.14/api/booking", bodyData).subscribe(
          (resultData: any) => {
              console.log(resultData);
              //alert("Room Booking Successfully");
              this.router.navigate(['/confirmbooking']);
          },
          (error) => {
            console.error("Error occurred while sending POST request:", error);
            if (error.status === 409) { 
                alert("Booking already in used.");
            } else {
                alert("Error registering room booking. Please check if the backend server is running/functioning properly or you might not be logged in that's why error");
            }
            // You can handle the error further as needed
        }
        );
        } else {
          // Handle the cancel action or do nothing
          console.log('Booking cancelled or closed');
        }
      });
    }
  }

  showMeetingRoomDetails(): void {
    this.bookedDetailsSelected = !this.bookedDetailsSelected;
  }

}
