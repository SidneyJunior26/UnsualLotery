import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/Users/users.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User[] = [];
  hide = true;

  constructor(
    private service: UsersService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Informe seu email';
    }

    return this.emailControl.hasError('email') ? 'Informe um email válido' : '';
  }

  close() {
    this.dialogRef.close();
  }

  loginClick(): void {
    var email = this.emailControl.value?.toString();
    var password = this.passwordControl.value?.toString();

    if (email != null) {
      this.service.findUserByEmail(email).subscribe(
        (users: User[]) => {
          this.user = users;

          if (email != null && password != null)
            this.verifyUser(email, password);
        },
        (error) => {
          if (error.status == '404')
            this.openSnackBar('Usuário não encontrado.');
        }
      );
    }
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  private verifyUser(email: string, password: string) {
    this.service.verifyUser(email, password).subscribe(
      () => {
        this.close();
      },
      (error) => {
        console.log(error);
        this.openSnackBar('Confirme o email e senha');
      }
    );
  }
}
