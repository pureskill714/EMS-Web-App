import { Component } from '@angular/core';

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

  isSelected(timeSlot: string): boolean {
    return this.selectedTimeSlots.includes(timeSlot);
  }

  toggleTimeSlot(timeSlot: string): void {
    const index = this.selectedTimeSlots.indexOf(timeSlot);
    if (index === -1) {
      this.selectedTimeSlots.push(timeSlot);
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

    if (this.selectedDate === null) {
      this.inputsFilled = false; // Date input is cleared
      this.showTimeSlots = false; // Hide time slots when date is cleared
    }

    if (this.selectedDate === "") {
      this.inputsFilled = false; // Date input is cleared
      this.showTimeSlots = false; // Hide time slots when date is cleared
    }

    // Hide time slots when inputs are not filled
    if (!this.inputsFilled) {
      this.showTimeSlots = false;
    }
  }

}
