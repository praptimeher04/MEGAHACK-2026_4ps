import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { Home } from './home/home';
import { RegisterComplaint } from './register-complaint/register-complaint';
import { MyComplaints } from './my-complaints/my-complaints';
import { AccountDetails } from './account-details/account-details';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'register-complaint', component: RegisterComplaint },
      { path: 'my-complaints', component: MyComplaints },
      { path: 'account-details', component: AccountDetails }
    ]
  }
];
