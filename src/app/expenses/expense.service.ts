import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from './expense.model';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private apiUrl = 'https://budget-app-backend-fte2.onrender.com/api/expenses';  // Backend base URL

    constructor(private http: HttpClient) { }

    // Helper method to add the Authorization header with JWT
    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        });
    }

    // Get all expenses for the logged-in user
    getExpensesByUser(userId: number): Observable<Expense[]> {
        return this.http.get<Expense[]>(`${this.apiUrl}/${userId}`, {
            headers: this.getAuthHeaders(),
        });
    }

    // Get expenses by category
    getExpensesByCategory(userId: number, category: string): Observable<Expense[]> {
        return this.http.get<Expense[]>(
            `${this.apiUrl}/${userId}/category?category=${category}`,
            { headers: this.getAuthHeaders() }
        );
    }

    // Get expenses by date range
    getExpensesByDateRange(userId: number, startDate: string, endDate: string): Observable<Expense[]> {
        return this.http.get<Expense[]>(
            `${this.apiUrl}/${userId}/date-range?startDate=${startDate}&endDate=${endDate}`,
            { headers: this.getAuthHeaders() }
        );
    }

    // Add a new expense
    addExpense(expense: Expense): Observable<Expense> {
        return this.http.post<Expense>(this.apiUrl, expense, {
            headers: this.getAuthHeaders(),
        });
    }

    // Update an existing expense
    updateExpense(id: number, expense: Expense): Observable<Expense> {
        return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense, {
            headers: this.getAuthHeaders(),
        });
    }

    // Delete an expense by ID
    deleteExpense(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, {
            headers: this.getAuthHeaders(),
        });
    }
}
