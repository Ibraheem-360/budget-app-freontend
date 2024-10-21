import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  category: string = '';
  startDate: string = '';
  endDate: string = '';
  userId!: number;  // Use userId from token

  constructor(private expenseService: ExpenseService, private router: Router) { }

  ngOnInit(): void {
    this.setUserIdFromToken();
    this.loadExpenses();
  }

  // Extract userId from JWT token
  setUserIdFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.userId;  // Extract userId from the token
    } else {
      console.error('No token found. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

  // Load expenses using userId
  loadExpenses(): void {
    this.expenseService.getExpensesByUser(this.userId).subscribe(
      (data) => (this.expenses = data),
      (error) => console.error('Error fetching expenses', error)
    );
  }

  // Filter expenses by category
  filterByCategory(): void {
    this.expenseService.getExpensesByCategory(this.userId, this.category).subscribe(
      (data) => (this.expenses = data),
      (error) => console.error('Error filtering by category', error)
    );
  }

  // Filter expenses by date range
  filterByDateRange(): void {
    this.expenseService.getExpensesByDateRange(this.userId, this.startDate, this.endDate).subscribe(
      (data) => (this.expenses = data),
      (error) => console.error('Error filtering by date range', error)
    );
  }

  // Delete an expense
  deleteExpense(id: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe(() => this.loadExpenses());
    }
  }
}
