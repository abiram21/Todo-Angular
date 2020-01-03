import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './Component/display/display.component';
import { TodoFormComponent } from './Component/todo-form/todo-form.component';


const routes: Routes = [
  {
    path: '',
    component: DisplayComponent
  },
  {
    path: 'todoForm',
    component: TodoFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
