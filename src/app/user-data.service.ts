import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private email: string | null = null;
  private firstName: string | null = null;
  private lastName: string | null = null;
  private role : string | null = null;

  private selectedBookingRoom: string | null = null;
  private selectedBookingDate: string | null = null;
  private inputBookingPurpose: string | null = null;
  private selectedTimeSlots: string[] = []; // Add selectedTimeSlots array

  private cancelledDate: string | null = null;
  private cancelledRoom: string | null = null;
  private cancelledTimeSlots: string[] = [];
  private cancelledPurpose : string | null = null;

  private meetingRoom : string | null = null;
  private newMeetingRoomName : string | null = null;
  private newRoomOrder : number | null = null;

  private roomCapacity : number | null = null;
  private meetingRoomLocation : string | null = null;

  private oldMeetingRoomName : string | null = null;

  private deletedMeetingRoomName : string | null = null;

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

  setRole(role: string) {
    this.role = role;
  }

  getRole(): string | null {
    return this.role;
  }

  setMeetingRoom(meetingRoom: string) {
    this.meetingRoom = meetingRoom;
  }

  getMeetingRoom(): string | null {
    return this.meetingRoom;
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

  setCancelledDate(date: string | null = null) {
    this.cancelledDate = date;
  }

  getCancelledDate(): string | null {
    return this.cancelledDate;
  }

  setCancelledRoom(room: string | null = null) {
    this.cancelledRoom = room;
  }


  getCancelledRoom(): string | null {
    return this.cancelledRoom;
  }

  setCancelledTimeSlots(timeSlots: string[]) {
    this.cancelledTimeSlots = timeSlots;
  }

  getCancelledTimeSlots(): string[] {
    return this.cancelledTimeSlots;
  }

  setCancelledPurpose(purpose: string | null = null) {
    this.cancelledPurpose = purpose;
  }

  getCancelledPurpose(): string | null {
    return this.cancelledPurpose ;
  }

  setNewMeetingRoomName(meetingRoomName: string | null = null) {
    this.newMeetingRoomName = meetingRoomName;
  }

  getnewMeetingRoomName(): string | null {
    return this.newMeetingRoomName;
  }

  setOldMeetingRoomName(meetingRoomName: string | null = null) {
    this.oldMeetingRoomName = meetingRoomName;
  }

  getOldMeetingRoomName(): string | null {
    return this.oldMeetingRoomName;
  }

  setNewRoomOrder(roomOrder: number| null = null) {
    this.newRoomOrder = roomOrder;
  }

  getnewRoomOrder(): number | null {
    return this.newRoomOrder;
  }

  setRoomCapacity(roomCapacity: number| null = null) {
    this.roomCapacity = roomCapacity
  }

  getRoomCapacity(): number | null {
    return this.roomCapacity;
  }

  setMeetingRoomLocation(meetingRoomLocation: string | null = null) {
    this.meetingRoomLocation = meetingRoomLocation;
  }

  getMeetingRoomLocation(): string | null {
    return this.meetingRoomLocation;
  }

  setDeletedMeetingRoom(meetingRoomName: string | null = null) {
    this.deletedMeetingRoomName = meetingRoomName;
  }

  getDeletedMeetingRoom(): string | null {
    return this.deletedMeetingRoomName;
  }


}
