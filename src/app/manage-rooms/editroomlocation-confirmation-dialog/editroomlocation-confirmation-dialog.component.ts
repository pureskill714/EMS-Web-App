import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-editroomlocation-confirmation-dialog',
  templateUrl: './editroomlocation-confirmation-dialog.component.html',
  styleUrl: './editroomlocation-confirmation-dialog.component.css'
})
export class EditroomlocationConfirmationDialogComponent {
  meetingRoomName: string | null = "";
  newMeetingRoomLocation: string | null = "";

  constructor(public dialogRef: MatDialogRef<EditroomlocationConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private userDataService: UserDataService) {}

  ngOnInit() {
    this.meetingRoomName = this.userDataService.getMeetingRoom()
 }


  onBackButton(): void {
    this.dialogRef.close('back');
  }

  onConfirm(): void {
    this.userDataService.setMeetingRoomLocation(this.newMeetingRoomLocation);
    this.dialogRef.close('confirm');
  }

}
