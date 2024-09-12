import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users/users.component';
import { IssuesComponent } from './components/issue/issues/issues.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { StatusesComponent } from './components/status/statuses/statuses.component';
import { StatusFormComponent } from './components/status/status-form/status-form.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { IssuesFormComponent } from './components/issue/issues-form/issues-form.component';
import { IssuesShowComponent } from './components/issue/issues-show/issues-show.component';
import { UsersFormComponent } from './components/users/users-form/users-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: UsersFormComponent },
      { path: 'users/edit/:id', component: UsersFormComponent },
      { path: 'issues', component: IssuesComponent },
      { path: 'issues/create', component: IssuesFormComponent },
      { path: 'issues/:id', component: IssuesShowComponent },
      { path: 'issues/edit/:id', component: IssuesFormComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/create', component: CategoryFormComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent },
      { path: 'statuses', component: StatusesComponent },
      { path: 'statuses/create', component: StatusFormComponent },
      { path: 'statuses/edit/:id', component: StatusFormComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
