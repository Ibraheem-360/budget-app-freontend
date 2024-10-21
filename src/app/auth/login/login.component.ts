import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };  // Use 'username' instead of 'email'
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        this.authService.storeToken(response.token);  // Store JWT token
        this.router.navigate(['/expenses']);  // Redirect to expenses page
      },
      (error) => {
        this.errorMessage = 'Invalid login credentials';
        console.error('Login failed:', error);  // Log error to console
      }
    );
  }
}
