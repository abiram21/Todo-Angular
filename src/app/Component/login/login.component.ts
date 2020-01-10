import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/Service/jwt.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  loginArray: any[];
  showErrorMessage = false;
  constructor(private router: Router, private fb: FormBuilder, public jwtService: JwtService, private toastr: ToastrService) { }


ngOnInit() {
  this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
}
onsubmit() {
  if (this.form.valid) {
    this.jwtService.login(this.form.value).subscribe(res => {
      console.log(res.access_token);
      localStorage.setItem('access_token', res.access_token);
      this.router.navigate(['/view']);
    }, (error) => {
      this.toastr.error('Try again!', 'Invalid Login!',
        { timeOut: 2000 });
      this.showErrorMessage = true;
     this.form.get('email').setValue('');
     this.form.get('password').setValue('');
    });
  }
}

}
