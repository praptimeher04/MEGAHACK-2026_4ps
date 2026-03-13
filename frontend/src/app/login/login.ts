import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  isLoginMode = true;

  registerData = {
    name: '',
    email: '',
    mobileNumber: '',
    password: ''
  };

  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private http: HttpClient) { }

  toggleMode(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(event: Event) {
    event.preventDefault();

    console.log('Attempting login with:', this.loginData);

    this.http.post<any>('http://localhost:8089/api/auth/login', this.loginData)
      .subscribe({
        next: (response) => {
          console.log('Login response:', response);
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userId', response.userId.toString());
            localStorage.setItem('userType', response.userType.toString());
          }
          alert('Login successful!');

          if (response.userType === 1) {
            this.router.navigate(['/super-admin']);
          } else if (response.userType === 2) {
            this.router.navigate(['/municipal-management']);
          } else if (response.userType === 3) {
            this.router.navigate(['/municipal-panel']);
          } else {
            this.router.navigate(['/dashboard/home']);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          const errorMessage = error.error?.message || error.message || 'Login failed';
          alert('Login Error: ' + errorMessage);
        }
      });
  }

  onRegister(form: any) {
    if (form.valid) {
      console.log('Form data:', this.registerData);

      this.http.post<any>('http://localhost:8090/api/auth/register', this.registerData)
        .subscribe({
          next: (response) => {
            if (response.token) {
              localStorage.setItem('authToken', response.token);
              localStorage.setItem('userId', response.userId.toString());
            }
            alert('Registration successful!');
            this.router.navigate(['/dashboard/home']);
          },
          error: (error) => {
            alert(error.error.message || 'Registration failed');
          }
        });
    }
  }
}
