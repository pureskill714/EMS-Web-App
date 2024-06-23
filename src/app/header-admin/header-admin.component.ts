import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Import AuthService
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  fullName: string | null;
  constructor(private authService: AuthService,private userDataService: UserDataService) {
    this.fullName = this.userDataService.getFullName();
  }

  ngOnInit() {
    const userData = this.authService.getUserData();
    if (userData) {
      const { email, firstName, lastName } = userData;
      this.userDataService.setFirstName(userData.firstName);
      this.userDataService.setLastName(userData.lastName);
      this.userDataService.setEmail(userData.email);
      this.fullName = this.userDataService.getFullName();
    } else {
      alert("THIS IS FAIL")
    }
  }

  logout(): void {
    this.authService.logout(); // Call AuthService logout method
  }

}
