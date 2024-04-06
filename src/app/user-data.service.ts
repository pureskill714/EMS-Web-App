import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private firstName: string | null = null;
  private lastName: string | null = null;
  private selectedBookingRoom: string | null = null;
  private selectedBookingDate: string | null = null;
  private selectedTimeSlots: string[] = []; // Add selectedTimeSlots array

  constructor() {}

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  setSelectedBookingRoom(room: string | null = null) {
    this.selectedBookingRoom = room;
  }

  setSelectedBookingDate(date: string | null = null) {
    this.selectedBookingDate = date;
  }

  getFullName(): string | null {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    } else {
      return null;
    }
  }

  getSelectedBookingRoom(): string | null {
    return this.selectedBookingRoom;
  }

  getSelectedBookingDate(): string | null {
    return this.selectedBookingDate;
  }

  // Method to set selected time slots
  setSelectedTimeSlots(timeSlots: string[]) {
    this.selectedTimeSlots = timeSlots;
  }

  // Method to get selected time slots
  getSelectedTimeSlots(): string[] {
    return this.selectedTimeSlots;
  }

  
}
