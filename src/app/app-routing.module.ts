import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {TodosComponent} from "./todos/todos.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
