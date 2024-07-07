import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserDataService } from './../user-data.service';

@Component({
  selector: 'app-meetingroominfo',
  templateUrl: './meetingroominfo.component.html',
  styleUrl: './meetingroominfo.component.css'
})
export class MeetingroominfoComponent {

  retrievedMeetingRoomNames : any = [];
  meetingRoomNames: any = [];
  meetingRooms: any = [];

  retrievedEmployeeDetails: any[] = [];
  roleCheck: string | null = null;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService,
    private http: HttpClient,) 
    {
      const userData = this.authService.getUserData();
      if (userData) {
        this.roleCheck = userData.role;
      }
  
      console.log(this.roleCheck)
      if (this.roleCheck != "non-managerial") {
        this.router.navigate(["not-authorized"]);
        this.authService.kickUser(); // Call AuthService kick user method
      }
    }

    ngOnInit(): void {
      const userData = this.authService.getUserData();
    if (userData) {
      const { email, firstName, lastName, role } = userData;
      this.userDataService.setFirstName(userData.firstName);
      this.userDataService.setLastName(userData.lastName);
      this.userDataService.setEmail(userData.email);
      this.userDataService.setRole(userData.role);
    } else {
      alert("THIS IS FAIL")
    }

      this.getEmployeeDetails();
    }

    getEmployeeDetails() {
      
      this.http.get("http://localhost:9992/getmeetingrooms").subscribe(
        (resultData: any) => {
          console.log(resultData);
  
          // Check if the response contains data and handle accordingly
        if (resultData) {
          console.log("retrieved meeting room names success at admin management");
          this.retrievedMeetingRoomNames = resultData
          console.log(this.retrievedMeetingRoomNames);

        //this.meetingRooms = [];

        // Loop through each object in the array
        for (let i = 0; i < this.retrievedMeetingRoomNames.length; i++) {
          // Extract the name property and add it to the string list
          this.meetingRoomNames.push(this.retrievedMeetingRoomNames[i]);
        }
        console.log("meeting room names below (admin management)")
        console.log(this.meetingRoomNames);
        this.meetingRooms = this.meetingRoomNames

        /*
        // Loop through each meeting room name
        this.meetingRoomNames.forEach(name => {
          // Create a meeting room object with the name and an empty calendarInfos array
          const meetingRoom = { name: name, order: name };

          // Add the meeting room object to the meetingRooms array
          console.log("meeting room default below")
          console.log(this.meetingRooms)
          this.meetingRooms.push(meetingRoom);
        });*/


        }
        else {
          console.log("retrieved meeting room names failed");
        }
      }
      );
    }

}
