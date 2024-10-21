import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://budget-app-backend-fte2.onrender.com/api/auth';  // Backend API URL

    constructor(private http: HttpClient, private router: Router) { }

    // Signup
    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    // Login
    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials);
    }

    // Store JWT token
    storeToken(token: string): void {
        localStorage.setItem('token', token);
    }

    // Check if user is logged in
    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    // Logout
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
