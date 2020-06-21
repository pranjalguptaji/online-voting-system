import { Routes } from '@angular/router';

//import { HeaderComponent } from '../header/header.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AddpostComponent } from "../addpost/addpost.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'addpost', component: AddpostComponent },
  { path: '', redirectTo: 'login', pathMatch: "full" }
];