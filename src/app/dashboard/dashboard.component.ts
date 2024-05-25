import { Component, OnInit } from '@angular/core';
import { UserDataService } from './../user-data.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  retrievedMeetingRoomNames : any = [];
  meetingRoomNames: string[] = [];
  selectedRoom: string = ""
  selectedMeetingRooms: boolean[] = [];

  // Define the meeting rooms and their calendar information
  meetingRoomsTimeSlots = [
    {
      name: 'Room A',
      calendarInfos: ['09:00', '13:00'] // Time slots occupied in 'HH:mm' format
    },
    {
      name: 'Room B',
      calendarInfos: ['10:00', '14:00'] // Time slots occupied in 'HH:mm' format
    },
    {
      name: 'Room C',
      calendarInfos: ['11:00', '15:00'] // Time slots occupied in 'HH:mm' format
    }
    // Add more rooms as needed
  ];

  // Define the time slots
  timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00'
    // Add more time slots as needed
  ];

  constructor(private userDataService: UserDataService,private authService: AuthService,private http: HttpClient) {
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

        }
        else {
          console.log("retrieved meeting room names failed");
        }
      }
      );
  }

  // Method to check if a time slot is occupied
  isTimeSlotOccupied(calendarInfos: string[], slot: string): boolean {
    // Extract the start time from the slot string
    const startTime = slot.split(' - ')[0];
    // Check if the start time is in the calendarInfos array
    return calendarInfos.includes(startTime);
  }

  showMeetingRoomDetails(index: number) {
    // Toggle the selected state for the clicked meeting room
    this.selectedMeetingRooms[index] = !this.selectedMeetingRooms[index];

    // Optionally: Add your logic to handle displaying meeting room details
    console.log(`Showing details for ${this.meetingRoomNames[index]}`);
  }

  

  

}
