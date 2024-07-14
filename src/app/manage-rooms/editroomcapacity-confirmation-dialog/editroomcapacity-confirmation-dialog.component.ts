import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-editroomcapacity-confirmation-dialog',
  templateUrl: './editroomcapacity-confirmation-dialog.component.html',
  styleUrl: './editroomcapacity-confirmation-dialog.component.css'
})
export class EditroomcapacityConfirmationDialogComponent {
  meetingRoomName: string | null = "";
  newMeetingRoomCapacity: number | null = null;

  constructor(public dialogRef: MatDialogRef<EditroomcapacityConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private userDataService: UserDataService) {}

  ngOnInit() {
    this.meetingRoomName = this.userDataService.getMeetingRoom()
 }


  onBackButton(): void {
    this.dialogRef.close('back');
  }

  onConfirm(): void {
    this.userDataService.setRoomCapacity(this.newMeetingRoomCapacity);
    this.dialogRef.close('confirm');
  }

}
