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
    if (this.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return; // Exit the function if password length is invalid
    }

    // Password complexity check using regular expression
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) {
        alert("Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.");
        return; // Exit the function if password complexity is invalid
    }

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
          if (error.status === 409) { // Assuming 409 is the status code for email already exists
              alert("Email already used. Please choose a different email address.");
          } else {
              alert("Error registering account. Please check if the backend server is running.");
          }
          // You can handle the error further as needed (e.g., logging, additional error handling)
      }
    );
}

  save()
  {
    this.register();
  }

}