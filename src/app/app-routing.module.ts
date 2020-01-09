import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './Component/display/display.component';
import { TodoFormComponent } from './Component/todo-form/todo-form.component';
import { LoginComponent } from './Component/login/login.component';
import { RegistrationComponent } from './Component/registration/registration.component';
import { AuthGuardService } from './Service/auth-guard.service';


const routes: Routes = [
  {
    path: 'view',
    component: DisplayComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'todoForm',
    component: TodoFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: LoginComponent,

  },
  {
    path: 'register',
    component: RegistrationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
