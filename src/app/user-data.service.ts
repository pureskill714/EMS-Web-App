import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private email: string | null = null;
  private firstName: string | null = null;
  private lastName: string | null = null;
  private selectedBookingRoom: string | null = null;
  private selectedBookingDate: string | null = null;
  private inputBookingPurpose: string | null = null;
  private selectedTimeSlots: string[] = []; // Add selectedTimeSlots array

  constructor() {}

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string | null {
    return this.email;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  getFirstName(): string | null {
    return this.firstName;
  }


  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  getLastName(): string | null {
    return this.lastName;
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

  setBookingPurpose(bookingPurpose: string | null = null) {
    this.inputBookingPurpose = bookingPurpose;
  }

  getInputBookingPurpose(): string | null {
    return this.inputBookingPurpose;
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
