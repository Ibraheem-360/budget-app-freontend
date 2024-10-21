import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from './budget.model';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    private apiUrl = 'https://budget-app-backend-fte2.onrender.com/api/budgets';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    // Get budgets by user
    getBudgetsByUser(userId: number): Observable<Budget[]> {
        return this.http.get<Budget[]>(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() });
    }

    // Get budget by category
    getBudgetByCategory(userId: number, category: string): Observable<Budget> {
        return this.http.get<Budget>(
            `${this.apiUrl}/${userId}/category?category=${category}`,
            { headers: this.getAuthHeaders() }
        );
    }

    // Create or update a budget
    createOrUpdateBudget(budget: Budget): Observable<Budget> {
        return this.http.post<Budget>(this.apiUrl, budget, { headers: this.getAuthHeaders() });
    }

    // Delete budget by ID
    deleteBudget(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }
}
