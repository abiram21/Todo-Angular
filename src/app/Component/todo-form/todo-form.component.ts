import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/Service/form.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  public form: FormGroup;
  flag = this.route.snapshot.queryParams['isEdit'];
  constructor( private fb: FormBuilder,private router: Router,private todoService:FormService, 
    private toastr: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams['isEdit']){
      this.todoService.editTodoArray$.subscribe(data => {
    this.form = this.fb.group({
      id: [data[0].id],
      title: [data[0].title, Validators.required],
      description: [data[0].description, Validators.required],
      dueDate: [data[0].dueDate, Validators.required],
      priority: [data[0].priority, Validators.required],
      status:[data[0].status, Validators.required]

    });
  })
}

  else{
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['Incomplete'],
    });
  }
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
        this.router.navigate(['']);
    }
   
  }
  onEdit()
  {
    if(this.form.valid)
    {
      this.todoService.updateTodo(this.form.value).subscribe(res=>
        {
          this.toastr.success('ToDo Updated!', 'Success!',
          {timeOut: 1000});;
        });
        this.router.navigate(['']);
    }
  }

 
}
