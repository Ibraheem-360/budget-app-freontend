import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expense: Expense = { category: '', amount: 0, notes: '', date: '' };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.expenseService.getExpensesByUser(1).subscribe((expenses) => {
        const foundExpense = expenses.find((e) => e.id === +id);
        if (foundExpense) this.expense = foundExpense;
      });
    }
  }

  saveExpense(): void {
    if (this.isEditMode) {
      this.expenseService.updateExpense(this.expense.id!, this.expense).subscribe(() => {
        this.router.navigate(['/expenses']);
      });
    } else {
      this.expenseService.addExpense(this.expense).subscribe(() => {
        this.router.navigate(['/expenses']);
      });
    }
  }
}