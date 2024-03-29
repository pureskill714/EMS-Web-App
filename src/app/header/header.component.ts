import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Import AuthService
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  fullName: string | null;
  constructor(private authService: AuthService,private userDataService: UserDataService) {
    this.fullName = this.userDataService.getFullName();
  }

  logout(): void {
    this.authService.logout(); // Call AuthService logout method
  }
}
