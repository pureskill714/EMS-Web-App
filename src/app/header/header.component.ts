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

  ngOnInit() {
    const userData = this.authService.getUserData();
    if (userData) {
      const { email, firstName, lastName } = userData;
      this.userDataService.setFirstName(userData.firstName);
      this.userDataService.setLastName(userData.lastName);
      this.userDataService.setEmail(userData.email);
      this.fullName = this.userDataService.getFullName();
    } else {
       this.router.navigate(["not-authorized"])
    }
  }

  logout(): void {
    this.authService.logout(); // Call AuthService logout method
  }

}


