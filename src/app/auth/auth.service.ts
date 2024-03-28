// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  constructor(private router: Router) {}

  login(username: string, password: string): void {
    // Logic to authenticate user (e.g., API call)
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;

    // Redirect to homepage after logout
    this.router.navigateByUrl('/');

  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}