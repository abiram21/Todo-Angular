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
  flag = this.todoService.isEdit;
  minDate = new Date();
  constructor(private fb: FormBuilder, private router: Router, private todoService: FormService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.todoService.isEdit === true) {
      this.todoService.editTodoArray$.subscribe(data => {
        this.form = this.fb.group({
          id: [data[0].id],
          title: [data[0].title, Validators.required],
          description: [data[0].description, Validators.required],
          dueDate: [data[0].dueDate, Validators.required],
          priority: [data[0].priority, Validators.required],
          status: [data[0].status, Validators.required]

        });
      });
    } else {
      this.form = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueDate: ['', Validators.required],
        priority: ['', Validators.required],
        status: ['Incomplete'],
      });
    }
  }


  onSubmit() {
    if (this.form.valid) {
      this.todoService.addTodo(this.form.value).subscribe(res => {
        this.toastr.success('ToDo added!', 'Success!',
          { timeOut: 2000 });
        this.router.navigate(['/view']);
      });
    }
  }


  onEdit() {
    if (this.form.valid) {
      this.todoService.updateTodo(this.form.value).subscribe(res => {
        this.toastr.success('ToDo Updated!', 'Success!',
          { timeOut: 2000 });
        this.router.navigate(['/view']);
      });
    }
  }

  toView() {
    this.router.navigate(['/view']);
  }
}
