import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/Service/form.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { JwtService } from 'src/app/Service/jwt.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  todoArray: any[];
  editArray: any[];
  uncompleteArray: any[];
  completeArray: any[];
  flag = true;
  constructor(private router: Router, private todoService: FormService, private toastr: ToastrService, public dialog: MatDialog,
              private jwtService: JwtService) { }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.todoService.getTodo().subscribe(res => {
      this.todoArray = res.data;
      console.log(this.todoArray);
      this.uncompleteArray = this.todoArray.filter(f => f.status === 'Incomplete');
      this.completeArray = this.todoArray.filter(f => f.status === 'Completed');
    });
  }

  onEdit(data) {


    this.editArray = this.todoArray.filter(f => f.id === data);
    this.router.navigate(['/todoForm']);
    this.todoService.setEditTodotArray(this.editArray);
  }


  addTodo() {
    this.todoService.isEdit = false;
    this.router.navigate(['/todoForm']);
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: 'Are you sure to delete'
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.todoService.deleteTodo(data).subscribe(
          res => {
            console.log(res.data);
            this.toastr.success('Deleted!', 'Success!',
              { timeOut: 2000 });
            this.todoArray = res.data;
            this.uncompleteArray = this.todoArray.filter(f => f.status === 'Incomplete');
            this.completeArray = this.todoArray.filter(f => f.status === 'Completed');
          }
        );
      }
    });
  }



  markDone(data) {
    const final = {
      id: data.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      status: 'Completed'
    };
    this.todoService.updateTodo(final).subscribe(res => {
      console.log(res.data);
      const index = this.todoArray.indexOf(data);
      this.todoArray[index] = res.data;
      this.uncompleteArray = this.todoArray.filter(f => f.status === 'Incomplete');
      this.completeArray = this.todoArray.filter(f => f.status === 'Completed');
      console.log(this.uncompleteArray.length);
      this.toastr.success('ToDo Updated!', 'Success!',
        { timeOut: 1000 });
    });
  }

  markUnDone(data) {
    const final = {
      id: data.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      status: 'Incomplete'
    };
    this.todoService.updateTodo(final).subscribe(res => {
      console.log(res.data);
      const index = this.todoArray.indexOf(data);
      this.todoArray[index] = res.data;
      this.uncompleteArray = this.todoArray.filter(f => f.status === 'Incomplete');
      this.completeArray = this.todoArray.filter(f => f.status === 'Completed');
      console.log(this.uncompleteArray.length);
      this.toastr.success('ToDo Updated!', 'Success!',
        { timeOut: 1000 });
    });
  }

  logout() {
    this.jwtService.logout();
  }
}
