import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient, private router: Router) { }

  getTodo()
  {
    return this.http.get<any>('http://localhost:8000/api/todo');
  }
  
 addTodo(form)
 {
  const data = {
    title: form.title,
     description: form.description,
     dueDate: form.dueDate,
     priority: form.priority,
   };
   return this.http.post<any>('http://localhost:8000/api/todo', data);
 }

 updateTodo(form){
  const data = {
    title: form.title,
     description: form.description,
     dueDate: form.dueDate,
     priority: form.priority,
 

   };
   return this.http.post<any>('http://localhost:8000/api/todo/'+form.id ,data);
 }

 deleteTodo(id) {
  return this.http.delete<any>('http://localhost:8000/api/todo/'+id);
}

}
