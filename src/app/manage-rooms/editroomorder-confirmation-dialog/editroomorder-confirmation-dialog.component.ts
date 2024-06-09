import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';


@Component({
  selector: 'app-editroomorder-confirmation-dialog',
  templateUrl: './editroomorder-confirmation-dialog.component.html',
  styleUrl: './editroomorder-confirmation-dialog.component.css'
})
export class EditroomorderConfirmationDialogComponent {
  meetingRoomName: string | null = "";
  newMeetingRoomOrder: number | null = null;

  constructor(public dialogRef: MatDialogRef<EditroomorderConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private userDataService: UserDataService) {}

  ngOnInit() {
    this.meetingRoomName = this.userDataService.getMeetingRoom()
 }


  onBackButton(): void {
    this.dialogRef.close('back');
  }

  onConfirm(): void {
    this.userDataService.setNewRoomOrder(this.newMeetingRoomOrder)
    this.dialogRef.close('confirm');

  } 
}
