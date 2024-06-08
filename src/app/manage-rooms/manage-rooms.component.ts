import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AddroomConfirmationDialogComponent } from './addroom-confirmation-dialog/addroom-confirmation-dialog.component';
import { DeleteroomConfirmationDialogComponent } from './deleteroom-confirmation-dialog/deleteroom-confirmation-dialog.component';
import { EditroomnameConfirmationDialogComponent } from './editroomname-confirmation-dialog/editroomname-confirmation-dialog.component';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient,private dialog: MatDialog,private userDataService: UserDataService,private router: Router) {
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
    const dialogRef = this.dialog.open(AddroomConfirmationDialogComponent, {
      width: '420px',
      panelClass: 'custom-dialog-container', // Custom CSS class for dialog container
      hasBackdrop: true, // Display backdrop behind the dialog
      backdropClass: 'custom-backdrop', // Custom CSS class for backdrop
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Handle the confirmation action
        let bodyData = {
          "newMeetingRoom": this.userDataService.getnewMeetingRoomName(),
          "newRoomOrder": this.userDataService.getnewRoomOrder()
      };

      this.http.post("http://localhost:9992/addmeetingrooms", bodyData).subscribe(
          (resultData: any) => {
              console.log(resultData);
              //alert("Room Booking Successfully");
              this.router.navigate(['/admin-dashboard']);
          },
          (error) => {
            console.error("Error occurred while sending POST request:", error);
            if (error.status === 409) { 
                alert("Error adding new meeting room.Room name or room order already in use");
            } else {
                alert("Error adding new meeting room. Please check if the backend server is running/functioning properly or you might not be logged in that's why error");
            }
            // You can handle the error further as needed
        }
        );



        console.log('Add new meeting room confirmed');
      }
      else{
        console.log('Add new room cancelled');
      }
    })

   
  }

  editRoomOrder(room: MeetingRoom) {
    // Add logic to edit room order
    const newOrder = prompt('Enter new order:', room.order.toString());
    if (newOrder !== null) {
      room.order = parseInt(newOrder, 10);
    }
  }

  editRoomName(roomId: string, meetingRoomName: string) {
     this.userDataService.setOldMeetingRoomName(meetingRoomName)
    // Add logic to edit room name
    const dialogRef = this.dialog.open(EditroomnameConfirmationDialogComponent, {
      width: '430px',
      panelClass: 'custom-dialog-container', // Custom CSS class for dialog container
      hasBackdrop: true, // Display backdrop behind the dialog
      backdropClass: 'custom-backdrop', // Custom CSS class for backdrop
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Handle the confirmation action

        let bodyData = {
          "id": roomId,
        };

        console.log('Edit new meeting room confirmed');
      }
      else{
        console.log('Edit new room cancelled');
      }
    })



  }

  deleteMeetingRoom(roomId: string, meetingRoomName: string) {
    this.userDataService.setDeletedMeetingRoom(meetingRoomName);
    console.log(roomId)
    console.log(meetingRoomName)
    
    const dialogRef = this.dialog.open(DeleteroomConfirmationDialogComponent, {
      width: '420px',
      panelClass: 'custom-dialog-container', // Custom CSS class for dialog container
      hasBackdrop: true, // Display backdrop behind the dialog
      backdropClass: 'custom-backdrop', // Custom CSS class for backdrop
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Handle the confirmation action
        let bodyData = {
          "id": roomId,
        };

        this.http.post("http://localhost:9992/deletemeetingrooms", bodyData).subscribe(
          (resultData: any) => {
              console.log(resultData);
              //alert("Room Booking Successfully");
              this.router.navigate(['/admin-dashboard']);
          },
          (error) => {
            console.error("Error occurred while sending POST request:", error);
            if (error.status === 409) { 
                alert("Error deleting new meeting room.Room may already be deleted");
            } else {
                alert("Error adding new meeting room. Please check if the backend server is running/functioning properly or you might not be logged in that's why error");
            }
            // You can handle the error further as needed
        }
        );

        console.log('Meeting room deletion confirmed');
      }
      else{
        console.log('Delete meeting room function cancelled');
      }
    })


  }


}
