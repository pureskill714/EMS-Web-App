import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AddroomConfirmationDialogComponent } from './addroom-confirmation-dialog/addroom-confirmation-dialog.component';
import { DeleteroomConfirmationDialogComponent } from './deleteroom-confirmation-dialog/deleteroom-confirmation-dialog.component';
import { EditroomcapacityConfirmationDialogComponent } from './editroomcapacity-confirmation-dialog/editroomcapacity-confirmation-dialog.component';
import { EditroomnameConfirmationDialogComponent } from './editroomname-confirmation-dialog/editroomname-confirmation-dialog.component';
import { EditroomorderConfirmationDialogComponent } from './editroomorder-confirmation-dialog/editroomorder-confirmation-dialog.component';
import { EditroomlocationConfirmationDialogComponent } from './editroomlocation-confirmation-dialog/editroomlocation-confirmation-dialog.component';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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

  roleCheck: string | null = null;

  constructor(private http: HttpClient,private dialog: MatDialog,
    private userDataService: UserDataService,private router: Router,
    private authService: AuthService,) {
      
    this.roleCheck = this.userDataService.getRole();
    console.log("role check below")
    console.log(this.roleCheck)
    if (this.roleCheck != "admin") {
      this.router.navigate(["not-authorized"]);
      this.authService.kickUser(); // Call AuthService kick user method
    }
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
          "newRoomOrder": this.userDataService.getnewRoomOrder(),
          "roomCapacity": this.userDataService.getRoomCapacity(),
          "meetingRoomLocation": this.userDataService.getMeetingRoomLocation()
      };

      this.http.post("http://localhost:9992/addmeetingrooms", bodyData).subscribe(
          (resultData: any) => {
              console.log(resultData);
              //alert("Room Booking Successfully");
              this.router.navigate(['/confirm-add-room']);
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

  editRoomOrder(roomId: string, meetingRoomName: string) {
    // Add logic to edit room order
    console.log(roomId)
    this.userDataService.setMeetingRoom(meetingRoomName);

    const dialogRef = this.dialog.open(EditroomorderConfirmationDialogComponent, {
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
          "newRoomOrder": this.userDataService.getnewRoomOrder(),
        };

        this.http.post("http://localhost:9992/editmeetingroomorder", bodyData).subscribe(
          (resultData: any) => {
              console.log(resultData);
              //alert("Room Booking Successfully");
              this.router.navigate(['/admin-dashboard']);
          },
          (error) => {
            console.error("Error occurred while sending POST request:", error);
            if (error.status === 409) { 
                alert("Error editing new meeting room order. Room order may have ben taken");
            } else {
                alert("Error editing new meeting room order. Please check if the backend server is running/functioning properly or you might not be logged in that's why error");
            }
            // You can handle the error further as needed
        }
        );

        console.log('Edit new meeting room confirmed');
      }
      else{
        console.log('Edit new room cancelled');
      }
    })
  }

  editRoomCapacity(roomId: string, meetingRoomName: string) {
    // Add logic to edit room order
    console.log(roomId)
    console.log(meetingRoomName)
    this.userDataService.setMeetingRoom(meetingRoomName);

    const dialogRef = this.dialog.open(EditroomcapacityConfirmationDialogComponent, {
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
          "newRoomCapacity": this.userDataService.getRoomCapacity()
        };

        this.http.post("http://localhost:9992/editmeetingroomcapacity", bodyData).subscribe(
          (resultData: any) => {
              console.log(resultData);
              //alert("Room Booking Successfully");
              this.router.navigate(['/confirm-edit-room-capacity']);
          },
          (error) => {
            console.error("Error occurred while sending POST request:", error);
            if (error.status === 409) { 
                alert("Error editing new meeting room capacity. Room order may have ben taken");
            } else {
                alert("Error editing new meeting room capacity. Please check if the backend server is running/functioning properly or you might not be logged in that's why error");
            }
            // You can handle the error further as needed
        }
        );

        console.log('Edit new meeting room capacity confirmed');
      }
      else{
        console.log('Edit new room capacity cancelled');
      }
    })
  }

  editRoomLocation(roomId: string, meetingRoomName: string) {
    // Add logic to edit room order
    console.log(roomId)
    this.userDataService.setMeetingRoom(meetingRoomName);

    const dialogRef = this.dialog.open(EditroomlocationConfirmationDialogComponent, {
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
          "newRoomLocation": this.userDataService.getMeetingRoomLocation()
        };

        this.http.post("http://localhost:9992/editmeetingroomlocation", bodyData).subscribe(
          (resultData: any) => {
              console.log(resultData);
              //alert("Room Booking Successfully");
              this.router.navigate(['/confirm-edit-room-location']);
          },
          (error) => {
            console.error("Error occurred while sending POST request:", error);
            if (error.status === 409) { 
                alert("Error editing new meeting room location. Room order may have ben taken");
            } else {
                alert("Error editing new meeting room location. Please check if the backend server is running/functioning properly or you might not be logged in that's why error");
            }
            // You can handle the error further as needed
        }
        );

        console.log('Edit new meeting room location confirmed');
      }
      else{
        console.log('Edit new room location cancelled');
      }
    })
  }

  editRoomName(roomId: string, oldMeetingRoomName: string) {
     this.userDataService.setOldMeetingRoomName(oldMeetingRoomName)
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
          "oldMeetingRoomName": oldMeetingRoomName,
          "newMeetingRoomName": this.userDataService.getnewMeetingRoomName(),
        };

        this.http.post("http://localhost:9992/editmeetingroomname", bodyData).subscribe(
          (resultData: any) => {
              console.log(resultData);
              //alert("Room Booking Successfully");
              this.router.navigate(['/confirm-edit-room']);
          },
          (error) => {
            console.error("Error occurred while sending POST request:", error);
            if (error.status === 409) { 
                alert("Error editing new meeting room name. Room may not exist anymore");
            } else {
                alert("Error editing new meeting room name. Please check if the backend server is running/functioning properly or you might not be logged in that's why error");
            }
            // You can handle the error further as needed
        }
        );

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
              this.router.navigate(['/confirm-delete-room']);
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
