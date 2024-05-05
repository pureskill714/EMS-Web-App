import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employeeinfo',
  templateUrl: './employeeinfo.component.html',
  styleUrl: './employeeinfo.component.css'
})
export class EmployeeinfoComponent implements OnInit {

  retrievedEmployeeDetails: any[] = []

  constructor(
    private router: Router,
    private http: HttpClient,) {}

    ngOnInit(): void {
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
          console.log(this.retrievedEmployeeDetails[0])
        }
        else {
          console.log("retrieved employee data failed");
        }
      }
      );
    }
}
