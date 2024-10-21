import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { AddBudgetComponent } from './budget/add-budget/add-budget.component';
import { EditBudgetComponent } from './budget/edit-budget/edit-budget.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ExpenseListComponent,
    AddExpenseComponent,
    BudgetListComponent,
    AddBudgetComponent,
    EditBudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
