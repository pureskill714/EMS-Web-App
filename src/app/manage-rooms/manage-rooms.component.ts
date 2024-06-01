import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MeetingRoom {
  name: string;
  order: number;
}


@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrl: './manage-rooms.component.css'
})

export class ManageRoomsComponent {
  retrievedMeetingRoomNames : any = [];
  meetingRoomNames: any = [];
  
  meetingRooms: any = [];

  constructor(private http: HttpClient) {
  }


  ngOnInit() {
    this.http.get("http://localhost:9992/getmeetingrooms").subscribe(
        (resultData: any) => {
          console.log(resultData);
  
          // Check if the response contains data and handle accordingly
        if (resultData) {
          console.log("retrieved meeting room names success at admin management");
          this.retrievedMeetingRoomNames = resultData
          console.log(this.retrievedMeetingRoomNames);
          console.log(this.retrievedMeetingRoomNames[1].name);
          console.log(this.retrievedMeetingRoomNames[1].roomOrder);

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

  addMeetingRoom() {
    const newRoom: MeetingRoom = { name: 'New Room', order: this.meetingRooms.length + 1 };
    this.meetingRooms.push(newRoom);
  }

  editRoomOrder(room: MeetingRoom) {
    // Add logic to edit room order
    const newOrder = prompt('Enter new order:', room.order.toString());
    if (newOrder !== null) {
      room.order = parseInt(newOrder, 10);
    }
  }

  editRoomName(room: MeetingRoom) {
    // Add logic to edit room name
    const newName = prompt('Enter new name:', room.name);
    if (newName !== null) {
      room.name = newName;
    }
  }

  deleteRoom(room: MeetingRoom) {
    // Add logic to delete the room
    const index = this.meetingRooms.indexOf(room);
    if (index !== -1) {
      this.meetingRooms.splice(index, 1);
    }
  }
}
