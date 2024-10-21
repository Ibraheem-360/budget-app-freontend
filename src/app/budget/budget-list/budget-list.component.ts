import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Budget } from '../budget.model';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {
  budgets: Budget[] = [];
  userId: number = 0;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      this.userId = decodedToken.userId;
    }
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getBudgetsByUser(this.userId).subscribe(
      (budgets) => (this.budgets = budgets),
      (error) => console.error('Error fetching budgets', error)
    );
  }

  deleteBudget(id: number): void {
    this.budgetService.deleteBudget(id).subscribe(() => this.loadBudgets());
  }
}
