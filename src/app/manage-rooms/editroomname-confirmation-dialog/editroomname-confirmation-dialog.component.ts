import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-editroomname-confirmation-dialog',
  templateUrl: './editroomname-confirmation-dialog.component.html',
  styleUrl: './editroomname-confirmation-dialog.component.css'
})
export class EditroomnameConfirmationDialogComponent {
  oldMeetingRoomName: string | null = "";
  newMeetingRoomName: string | null = "";

  constructor(public dialogRef: MatDialogRef<EditroomnameConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private userDataService: UserDataService) {}

  ngOnInit() {
    this.oldMeetingRoomName = this.userDataService.getOldMeetingRoomName()
 }


  onBackButton(): void {
    this.dialogRef.close('back');
  }

  onConfirm(): void {
    this.userDataService.setNewMeetingRoomName(this.newMeetingRoomName);
    this.dialogRef.close('confirm');
  }


}
