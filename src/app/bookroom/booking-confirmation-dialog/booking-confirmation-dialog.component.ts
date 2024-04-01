import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-booking-confirmation-dialog',
  templateUrl: './booking-confirmation-dialog.component.html',
})
export class BookingConfirmationDialogComponent {
  selectedDate: string | null = null;
  selectedRoom: string | null = null;

  constructor(public dialogRef: MatDialogRef<BookingConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private userDataService: UserDataService) {
    this.selectedDate = this.userDataService.getSelectedBookingDate();
    this.selectedRoom = this.userDataService.getSelectedBookingRoom();

  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
  }
}
