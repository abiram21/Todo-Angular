import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  login(form) {
    const data = {
      email: form.email,
      password: form.password,
    };
    return this.http.post<{ access_token: string }>('http://localhost:8000/api/login', data).subscribe(res => {
      console.log(res.access_token);
      localStorage.setItem('access_token', res.access_token);
      this.router.navigate(['/view']);
    });
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }

  register(form) {
    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    return this.http.post<{ access_token: string }>('http://localhost:8000/api/register', data).subscribe(res => {
      console.log(res.access_token);
      this.toastr.success('Login please!', 'Registration Success!',
      { timeOut: 2000 });
    });
  }
}
