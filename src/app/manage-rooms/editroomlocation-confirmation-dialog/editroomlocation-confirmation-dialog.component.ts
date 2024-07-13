import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-editroomlocation-confirmation-dialog',
  templateUrl: './editroomlocation-confirmation-dialog.component.html',
  styleUrl: './editroomlocation-confirmation-dialog.component.css'
})
export class EditroomlocationConfirmationDialogComponent {
  oldMeetingRoomName: string | null = "";
  newMeetingRoomLocation: string | null = "";

  constructor(public dialogRef: MatDialogRef<EditroomlocationConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private userDataService: UserDataService) {}

  ngOnInit() {
    this.oldMeetingRoomName = this.userDataService.getOldMeetingRoomName()
 }


  onBackButton(): void {
    this.dialogRef.close('back');
  }

  onConfirm(): void {
    this.userDataService.setNewMeetingRoomName(this.newMeetingRoomLocation);
    this.dialogRef.close('confirm');
  }

}
