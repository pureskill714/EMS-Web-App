import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private firstName: string | null = null;
  private lastName: string | null = null;

  constructor() {}

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  getFullName(): string | null {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    } else {
      return null;
    }
  }
}
