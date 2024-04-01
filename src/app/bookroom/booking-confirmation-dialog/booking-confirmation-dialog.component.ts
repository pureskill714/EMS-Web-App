import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-confirmation-dialog',
  templateUrl: './booking-confirmation-dialog.component.html',
})
export class BookingConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookingConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close('cancel');
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
  }
}
