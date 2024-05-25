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
  meetingRooms: any = [];
  selectedRoom: string = ""
  selectedMeetingRooms: boolean[] = [];
  retrievedAllMeetingRoomDetails : any = [];

  // Define the meeting rooms and their calendar information
  meetingRoomsTimeSlots = [];

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

          // Loop through each meeting room name
      this.meetingRoomNames.forEach(name => {
        // Create a meeting room object with the name and an empty calendarInfos array
        const meetingRoom = { name: name, calendarInfos: [''] };

        // Add the meeting room object to the meetingRooms array
        this.meetingRooms.push(meetingRoom);
        console.log("meeting room with calendar")
        console.log(this.meetingRooms)
      });

        }
        else {
          console.log("retrieved meeting room names failed");
        }
      }
      );

      let bodyData = {
        "date": new Date().toISOString().split('T')[0] // Set to today's date in YYYY-MM-DD format
      };

      this.http.post<any>('http://localhost:9992/retrievecalendarmeetingroomdetails', bodyData)
      .subscribe(
        (resultData: any) => {
          console.log("received all meeting room details")
          console.log(resultData);
          //console.log(resultData[0]);
          this.retrievedAllMeetingRoomDetails = resultData;
          console.log(this.retrievedAllMeetingRoomDetails[0].bookings[0].date)
        });
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
