import { Component } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Budget } from '../budget.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css']
})
export class AddBudgetComponent {
  budget: Budget = { category: '', monthlyLimit: 0, userId: 0 };

  constructor(private budgetService: BudgetService, private router: Router) { }

  saveBudget(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      this.budget.userId = decodedToken.userId;
    }
    this.budgetService.createOrUpdateBudget(this.budget).subscribe(() => {
      this.router.navigate(['/budgets']);
    });
  }
}
