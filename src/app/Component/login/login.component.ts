import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/Service/jwt.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  loginArray: any[];
 constructor(private router: Router, private fb: FormBuilder, private jwtService: JwtService) { }

 ngOnInit() {
   this.form = this.fb.group({
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required]]
   });
 }
 onsubmit() {
   if (this.form.valid) {
    this.jwtService.login(this.form.value);
   }
 }

}
