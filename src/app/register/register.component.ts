import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef<HTMLInputElement>;

  firstname: string ="";
  lastname: string ="";
  email: string ="";
  password: string ="";
  confirmPassword: string = "";

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}
  

  ngOnInit(): void
  {
  }

  togglePasswordVisibility(input: HTMLInputElement): void {
    this.showPassword = !this.showPassword;
    const inputType = this.passwordInput.nativeElement.type;
    this.passwordInput.nativeElement.type = inputType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(input: HTMLInputElement): void {
    this.showConfirmPassword = !this.showConfirmPassword;
    const inputType = this.confirmPasswordInput.nativeElement.type;
    this.confirmPasswordInput.nativeElement.type = inputType === 'password' ? 'text' : 'password';
  }

  register() {
      // Check if first name is missing
      if (!this.firstname) {
        alert("Please enter your first name.");
        return; // Exit the function if first name is missing
    }

      // Check if last name is missing
      if (!this.lastname) {
          alert("Please enter your last name.");
          return; // Exit the function if last name is missing
      }

      // Check if email is missing or invalid format
      if (!this.email || !this.email.includes('@')) {
          alert("Please enter a valid email address.");
          return; // Exit the function if email is missing or invalid
      }

      if (this.password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return; // Exit the function if password length is invalid
      }

      // Check if password and confirm password match
      if (this.password !== this.confirmPassword) {
        alert("Password and confirm password do not match. Please try again.");
        return; // Exit the function if passwords don't match
      }

    // Password complexity check using regular 192.168.10.110ion
    /*const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) {
        alert("Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.");
        return; // Exit the function if password complexity is invalid
    }*/

     // Check if email contains the required domain. Comment out if needed to register other emails
     /*const validDomain = '@wizvision.com';
     if (!this.email.includes(validDomain)) {
         alert(`Email must be from ${validDomain}`);
         return; // Exit the function if email domain is invalid
     }*/

    let bodyData = {
        "firstname": this.firstname,
        "lastname": this.lastname,
        "email": this.email,
        "password": this.password,
    };

    this.http.post("http://58.182.172.239/api/create", bodyData).subscribe(
        (resultData: any) => {
            console.log(resultData);
            this.router.navigate(['/registerconfirmation']);
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