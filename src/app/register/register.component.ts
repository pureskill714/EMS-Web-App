import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  firstname: string ="";
  lastname: string ="";
  email: string ="";
  password: string ="";

  constructor(private http: HttpClient) 
  {
  }

  ngOnInit(): void
  {
  }

  register() {
    let bodyData = {
        "firstname": this.firstname,
        "lastname": this.lastname,
        "email": this.email,
        "password": this.password,
    };

    this.http.post("http://localhost:9992/create", bodyData).subscribe(
        (resultData: any) => {
            console.log(resultData);
            alert("Account Registered Successfully");
        },
        (error) => {
            console.error("Error occurred while sending POST request:", error);
            alert("Error register account. Please check if backend server is running.");
            // You can handle the error further as needed (e.g., logging, additional error handling)
        }
    );
}

  save()
  {
    this.register();
  }

}