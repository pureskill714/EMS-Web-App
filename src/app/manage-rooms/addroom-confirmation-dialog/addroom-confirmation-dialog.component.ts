import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-addroom-confirmation-dialog',
  templateUrl: './addroom-confirmation-dialog.component.html',
  styleUrl: './addroom-confirmation-dialog.component.css'
})
export class AddroomConfirmationDialogComponent {
  meetingRoomName: string = '';
  roomOrder: number | null = null;
  roomCapacity: number | null = null;
  meetingRoomLocation: string = '';

  constructor(public dialogRef: MatDialogRef<AddroomConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private userDataService: UserDataService) {
    

  }

  onBackButton(): void {
    this.dialogRef.close('back');
  }

  onConfirm(): void {
    this.userDataService.setNewMeetingRoomName(this.meetingRoomName);
    this.userDataService.setNewRoomOrder(this.roomOrder);
    this.userDataService.setRoomCapacity(this.roomCapacity);
    this.userDataService.setMeetingRoomLocation(this.meetingRoomLocation);
    this.dialogRef.close('confirm');
  }

}
