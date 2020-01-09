import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/Service/jwt.service';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private jwtService: JwtService, private dialog: MatDialog) {   }
  flag = this.jwtService.loggedIn;
  ngOnInit() {

  }
  logout() {
    this.jwtService.logout();
    this.flag = this.jwtService.loggedIn;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '400px',
      data: 'Register'
    });

  }

}
