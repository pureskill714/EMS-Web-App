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
  meetingRooms: string[] = [];
  selectedRoom: string = ""

  retrievedCalendarDetails = [
    {
      date: new Date(),
      timeslots: ['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM'],
      meetingRoom: 'Meeting Room 1',
      purpose: 'Team Meeting',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    {
      date: new Date(),
      timeslots: ['01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM'],
      meetingRoom: 'Meeting Room 2',
      purpose: 'Client Presentation',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com'
    }
    // Add more calendar details as needed
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

  // Dummy functions
  onRoomChange() {
    // Dummy function body
    console.log('Room changed to:', this.selectedRoom);
  }



}
