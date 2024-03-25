import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  isLogin: boolean = true;
  erroMessage: string = "";

  constructor(private router: Router,private http: HttpClient) {}

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
          // Check if 'role' data is present in the response
          if (resultData.role) {
            const userRole = resultData.role;
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