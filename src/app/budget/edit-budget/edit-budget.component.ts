import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../budget.service';
import { Budget } from '../budget.model';

@Component({
  selector: 'app-edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.css']
})
export class EditBudgetComponent implements OnInit {
  budget: Budget = { category: '', monthlyLimit: 0, userId: 0 };
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.budgetService.getBudgetsByUser(this.budget.userId).subscribe((budgets) => {
      const foundBudget = budgets.find((b) => b.id === this.id);
      if (foundBudget) this.budget = foundBudget;
    });
  }

  updateBudget(): void {
    this.budgetService.createOrUpdateBudget(this.budget).subscribe(() => {
      this.router.navigate(['/budgets']);
    });
  }
}
