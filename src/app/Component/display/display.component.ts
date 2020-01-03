import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/Service/form.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

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
  constructor(private router: Router,private todoService:FormService, 
    private toastr: ToastrService,public dialog: MatDialog) {
      this.getData();
     }

  ngOnInit() {
    this.getData();
    
  
  }

  getData() {
    this.todoService.getTodo().subscribe(res=>{
      this.todoArray = res.data;
     console.log(this.todoArray);
     this.uncompleteArray = this.todoArray.filter(f=>f.status == 'Incomplete')
     this.completeArray = this.todoArray.filter(f=>f.status == 'Completed')
    });
  }

  onEdit(data)
  {
    
    
    this.editArray = this.todoArray.filter(f => f.id == data);
    console.log("edit todo",this.editArray);
    this.router.navigate(['/todoForm'],{queryParams: {  isEdit: true}})
    this.todoService.setEditTodotArray(this.editArray);
  }
  onDelete(data)
  {
    this.todoService.deleteTodo(data).subscribe(
      res => {
        this.toastr.success('Deleted!', 'Success!',
      {timeOut: 2000});;
      window.location.reload();
      }
    );
  }
  addTodo()
  {
    this.router.navigate(['/todoForm']);
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: "Are you sure to delete"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.todoService.deleteTodo(data).subscribe(
        res => {
          this.toastr.success('Deleted!', 'Success!',
        {timeOut: 2000});;
        window.location.reload();
        }
      );
    });
  }

  markDone(data)
  {
    const final = {
      id: data.id,
      title: data.title,
       description: data.description,
       dueDate: data.dueDate,
       priority: data.priority,
       status: 'Completed'
     };
     this.todoService.updateTodo(final).subscribe(res=>
      {
        this.toastr.success('ToDo Updated!', 'Success!',
        {timeOut: 1000});;
        window.location.reload();
      });
      console.log(final);
      
     
  }
}
