import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  isLoginMode = true; // Togggle between Simple Login and Simple Register

  constructor(private router: Router) {}

  toggleMode(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(event: Event) {
    event.preventDefault(); // Prevent default form submission
    this.router.navigate(['/dashboard']);
  }

  onRegister(event: Event) {
    event.preventDefault(); // Prevent default form submission
    // After successful registration, nav to dashboard
    this.router.navigate(['/dashboard']);
  }
}
