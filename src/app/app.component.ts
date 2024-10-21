import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Budget App';

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if user is logged in
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token
    this.router.navigate(['/login']); // Redirect to login
  }
}
