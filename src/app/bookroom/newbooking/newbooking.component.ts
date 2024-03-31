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
  minDate: string; // Define minDate property

  constructor() {
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
      window.alert('Please select a timeslot.'); // Display alert if no timeslot is selected
    } else {
      // Perform the next action (e.g., navigate to the next page)
      console.log('Next button clicked with selected timeslots:', this.selectedTimeSlots);
    }
  }

}
