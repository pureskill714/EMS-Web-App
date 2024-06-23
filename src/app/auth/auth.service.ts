// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private readonly storageKey = 'userData';
  constructor(private router: Router) {}

  login(username: string, password: string): void {
    // Logic to authenticate user (e.g., API call)
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.clearUserData();

    // Redirect to homepage after logout
    this.router.navigateByUrl('/');
  }

  kickUser(): void {
    this.isLoggedIn = false;
    this.clearUserData();
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Method to store user data in browser storage
  storeUserData(email: string, firstName: string, lastName: string) {
    const userData = { email, firstName, lastName };
    localStorage.setItem(this.storageKey, JSON.stringify(userData));
  }

  // Method to retrieve user data from browser storage
  getUserData() {
    const userDataString = localStorage.getItem(this.storageKey);
    return userDataString ? JSON.parse(userDataString) : null;
  }

  // Method to clear user data from browser storage (e.g., on logout)
  clearUserData() {
    localStorage.removeItem(this.storageKey);
  }
}