import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor() {
    this.loginForm.valueChanges.subscribe((value) => {
      console.log(value);
    })
  }

  login() {
    //Call API with username and password
    if (this.loginForm.invalid)
      return alert('Invalid Email Or Password');

    alert('Calling backend to login')

  }

}
