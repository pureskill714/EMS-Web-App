import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingConfirmationDialogComponent } from '../booking-confirmation-dialog/booking-confirmation-dialog.component';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrl: './newbooking.component.css'
})
export class NewbookingComponent {
  selectedDate: string | null = null;
  selectedRoom: string | null = null;
  showTimeSlots: boolean = false;
  selectedTimeSlots: string[] = [];
  inputsFilled: boolean = false;
  minDate: string; // Define minDate property

  constructor(private dialog: MatDialog,private userDataService: UserDataService) {
    // Initialize minDate to the current date
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

  }

  isSelected(timeSlot: string): boolean {
    console.log(this.selectedTimeSlots);
    return this.selectedTimeSlots.includes(timeSlot);
  }

  toggleTimeSlot(timeSlot: string): void {
    const index = this.selectedTimeSlots.indexOf(timeSlot);
    if (index === -1) {
      // Find the index where the new time slot should be inserted
      let insertIndex = 0;
      while (insertIndex < this.selectedTimeSlots.length && this.selectedTimeSlots[insertIndex] < timeSlot) {
        insertIndex++;
      }
      // Insert the new time slot at the correct index
      this.selectedTimeSlots.splice(insertIndex, 0, timeSlot);
    } else {
      this.selectedTimeSlots.splice(index, 1);
    }
  }
  

  search(): void {
    // Perform search logic here (e.g., fetch time slots from backend)
    // For demonstration, I'm just setting showTimeSlots to true
    this.showTimeSlots = true;
  }

  checkInputs(): void {
    this.inputsFilled = this.selectedDate !== null && this.selectedRoom !== null;

    this.userDataService.setSelectedBookingDate(this.selectedDate);
    this.userDataService.setSelectedBookingRoom(this.selectedRoom);

    console.log(this.selectedDate);
    console.log(this.selectedRoom);

    if (this.selectedDate === null) {
      this.inputsFilled = false; // Date input is cleared
      this.showTimeSlots = false; // Hide time slots when date is cleared
      this.selectedTimeSlots = [];
      console.log(this.selectedTimeSlots)
    }

    if (this.selectedDate === "") {
      this.inputsFilled = false; // Date input is cleared
      this.showTimeSlots = false; // Hide time slots when date is cleared
      this.selectedTimeSlots = [];
      console.log(this.selectedTimeSlots)
    }

    // Hide time slots when inputs are not filled
    if (!this.inputsFilled) {
      this.showTimeSlots = false;
    }
  }

  onNextButtonClick(): void {
    if (this.selectedTimeSlots.length === 0) {
      window.alert('Please select a timeslot.');
    } else {
      this.userDataService.setSelectedTimeSlots(this.selectedTimeSlots);
      const dialogRef = this.dialog.open(BookingConfirmationDialogComponent, {
        width: '420px',
        panelClass: 'custom-dialog-container', // Custom CSS class for dialog container
        hasBackdrop: true, // Display backdrop behind the dialog
        backdropClass: 'custom-backdrop', // Custom CSS class for backdrop
        data: { selectedDate: this.selectedDate, selectedRoom: this.selectedRoom }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          // Handle the confirmation action
          console.log('Booking confirmed');
        } else {
          // Handle the cancel action or do nothing
          console.log('Booking cancelled or closed');
        }
      });
    }
  }

}
