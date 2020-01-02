import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormService } from 'src/app/Service/form.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  public form: FormGroup;
  todoArray: any[];
  constructor( private fb: FormBuilder,private router: Router,private todoService:FormService, 
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],

    });
    this.todoService.getTodo().subscribe(res=>{
      this.todoArray = res.data;
    });
  }
  onSubmit()
  {
    if(this.form.valid)
    {
      this.todoService.addTodo(this.form.value).subscribe(res=>
        {
          this.toastr.success('ToDo added!', 'Success!',
          {timeOut: 20000});;
        });
    }
  }

}
