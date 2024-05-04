import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fullName: string = ''; // Initialize fullName property

  email: string = '';
  password: string = '';

  isLogin: boolean = true;
  erroMessage: string = "";

  showPassword: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private userDataService: UserDataService,) {}

    togglePasswordVisibility(input: HTMLInputElement): void {
      this.showPassword = !this.showPassword;
      input.type = this.showPassword ? 'text' : 'password';
    }

  login() {
    console.log(this.email);
    console.log(this.password);

    let bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:9992/login", bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);

        if (resultData.status) {
          // Update authentication status using AuthService
          this.authService.login(this.email, this.password);
          this.userDataService.setEmail(this.email);
          
          // Check if 'role' data is present in the response
          if (resultData.role) {
            const userRole = resultData.role;
            this.authService.storeUserData(this.email, resultData.firstname, resultData.lastname); // Store user data in browser storage
            this.userDataService.setFirstName(resultData.firstname);
            this.userDataService.setLastName(resultData.lastname);
            // Perform role-based actions or redirection based on the user's role
            if (userRole === 'non-managerial') {
              this.router.navigateByUrl('dashboard');
            } else if (userRole === 'project-manager') {
              this.router.navigateByUrl('pm-dashboard');
            } else {
              this.router.navigateByUrl('dashboard');
            }
          } else {
            console.error("Role data not found in login response.");
            alert("Error occurred during login. Please try again.");
          }
        } else {
          alert("Incorrect Email or Password");
          console.log("Error login");
        }
      },
      (error) => {
        console.error("Error occurred while sending POST request:", error);
        alert("Error logging in. Please check if backend server is running.");
      }
    );
  }

}