import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-booking-cancellation-dialog-admin',
  templateUrl: './booking-cancellation-dialog-admin.component.html',
  styleUrl: './booking-cancellation-dialog-admin.component.css'
})
export class BookingCancellationDialogAdminComponent {

  constructor(public dialogRef: MatDialogRef<BookingCancellationDialogAdminComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private userDataService: UserDataService) {}

  onBackButton(): void {
    this.dialogRef.close('back');
  }

  onCancelButton(): void {
    this.dialogRef.close('cancel');
  }

}
