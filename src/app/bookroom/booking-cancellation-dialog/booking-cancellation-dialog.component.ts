import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-booking-cancellation-dialog',
  templateUrl: './booking-cancellation-dialog.component.html',
  styleUrl: './booking-cancellation-dialog.component.css'
})
export class BookingCancellationDialogComponent {
  date: string | null = null;
  room: string | null = null;
  timeSlots: string[] | null = null;
  purpose: string | null = null;

  constructor(public dialogRef: MatDialogRef<BookingCancellationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private userDataService: UserDataService) {
    this.date = this.userDataService.getCancelledDate();
    this.room = this.userDataService.getCancelledRoom();
    this.timeSlots = this.userDataService.getCancelledTimeSlots();
    this.purpose = this.userDataService.getCancelledPurpose();

  }

  onBackButton(): void {
    this.dialogRef.close('back');
  }

  onCancelButton(): void {
    this.dialogRef.close('cancel');
  }

}
