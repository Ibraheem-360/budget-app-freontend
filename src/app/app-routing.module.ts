import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { AddBudgetComponent } from './budget/add-budget/add-budget.component';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { EditBudgetComponent } from './budget/edit-budget/edit-budget.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/add', component: AddExpenseComponent },
  { path: 'expenses/edit/:id', component: AddExpenseComponent },
  { path: 'budgets', component: BudgetListComponent },
  { path: 'add-budget', component: AddBudgetComponent },
  { path: 'edit-budget/:id', component: EditBudgetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
