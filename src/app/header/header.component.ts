import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Import AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout(); // Call AuthService logout method
  }
}
