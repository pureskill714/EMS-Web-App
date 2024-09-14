import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserDataService } from './../user-data.service';

@Component({
  selector: 'app-employeeinfo',
  templateUrl: './employeeinfo.component.html',
  styleUrl: './employeeinfo.component.css'
})
export class EmployeeinfoComponent implements OnInit {

  retrievedEmployeeDetails: any[] = [];
  roleCheck: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService,
    private http: HttpClient,) 
    {
      const userData = this.authService.getUserData();
      if (userData) {
        this.roleCheck = userData.role;
      }
  
      console.log(this.roleCheck)
      if (this.roleCheck != "non-managerial") {
        this.router.navigate(["not-authorized"]);
        this.authService.kickUser(); // Call AuthService kick user method
      }
    }

    ngOnInit(): void {
      const userData = this.authService.getUserData();
    if (userData) {
      const { email, firstName, lastName, role } = userData;
      this.userDataService.setFirstName(userData.firstName);
      this.userDataService.setLastName(userData.lastName);
      this.userDataService.setEmail(userData.email);
      this.userDataService.setRole(userData.role);
    } else {
      alert("THIS IS FAIL")
    }

      this.getEmployeeDetails();
    }

    getEmployeeDetails() {
      
      this.http.get("http://localhost:9992/getemployeedetails").subscribe(
        (resultData: any) => {
          console.log(resultData);
  
          // Check if the response contains data and handle accordingly
        if (resultData) {
          console.log("retrieved employee data success");
          this.retrievedEmployeeDetails = resultData;
        }
        else {
          console.log("retrieved employee data failed");
        }
      }
      );
    }
}
