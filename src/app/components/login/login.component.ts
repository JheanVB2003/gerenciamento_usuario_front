import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  isLoginMode: boolean = true;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.email = '';
    this.password = '';
    this.name = '';
  }

  login() {
    console.log('Login attempt:', { email: this.email, password: this.password });
    // Here you would typically make an API call to authenticate
  }

  register() {
    console.log('Registration attempt:', { 
      email: this.email, 
      password: this.password,
      name: this.name
    });
    // Here you would typically make an API call to register
  }

  forgotPassword() {
    console.log('Forgot password clicked');
    // Add your forgot password logic here
  }
}
