import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Toast, ToastrService } from 'ngx-toastr';
import { JwtService } from 'src/app/Service/jwt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup;
  constructor(private dialog: MatDialog, private toastr: ToastrService, private jwtService: JwtService,  private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
onsubmit() {
  if (this.form.valid) {
    this.jwtService.register(this.form.value);
    this.dialog.closeAll();
  }
}


}
