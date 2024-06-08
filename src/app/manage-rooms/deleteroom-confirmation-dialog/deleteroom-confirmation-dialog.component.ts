import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-deleteroom-confirmation-dialog',
  templateUrl: './deleteroom-confirmation-dialog.component.html',
  styleUrl: './deleteroom-confirmation-dialog.component.css'
})
export class DeleteroomConfirmationDialogComponent {
  meetingRoomName: string | null = this.userDataService.getDeletedMeetingRoom();
  

  constructor(public dialogRef: MatDialogRef<DeleteroomConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private userDataService: UserDataService) 
  {
    

  }

  onBackButton(): void {
    this.dialogRef.close('back');
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
  }

}
