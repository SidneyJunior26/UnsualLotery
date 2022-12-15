import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/Users/users.service';
import { LoginComponent } from '../login/login/login.component';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userIsLoggedIn = false;
  firstName: string;
  userId: string;

  constructor(
    public dialog: MatDialog,
    public service: UsersService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.checkLogIn();
  }

  viewUser(): void {
    this.router.navigateByUrl('/user/' + this.userId);
  }

  registerUser(): void {
    this.router.navigateByUrl('/register');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.checkLogIn();
    });
  }

  logOut() {
    this.service.logOutUser();
    this.checkLogIn();
    this.router.navigateByUrl('/raffles');
  }

  checkLogIn() {
    var token = localStorage.getItem('currentUser');

    if (token != null) {
      var userInfo = this.service.getDecodedAccessToken(token);

      this.firstName = userInfo.FirstName;
      this.userId = userInfo.nameid;
    }

    this.userIsLoggedIn = token != null;
  }
}
