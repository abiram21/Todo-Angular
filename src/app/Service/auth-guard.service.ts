import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MatSnackBarConfig } from '@angular/material';
import { JwtService } from './jwt.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private jwtService: JwtService, private toastr: ToastrService) { }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> | boolean {
  if (!this.jwtService.loggedIn) {
    this.toastr.error('Invalid Login!', 'Login First!',
    { timeOut: 2000 });
    this.router.navigate(['']);
    return false;
  }
  return true;
}
}
