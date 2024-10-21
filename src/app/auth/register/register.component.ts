import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.user).subscribe(
      () => {
        this.successMessage = 'Registration successful! Please login.';
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Registration failed. Try again.';
      }
    );
  }
}
