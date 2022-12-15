import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/Users/users.service';
import { User } from 'src/app/shared/models/user';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  userId: string;

  message: boolean = false;
  messageError: boolean = false;

  userControl = this.formBuilder.group({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private nav: NavbarComponent
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['UserId'];
    this.showUser();
  }

  private showUser(): void {
    this.service.findUserById(this.userId).subscribe(
      (user: User) => {
        this.userControl.setValue({
          email: user.email,
          password: '',
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
        });
      },
      (error) => {
        if (error.status == '401') {
          this.openSnackBar('Usuário deslogado. Favor realizar login.');
          this.service.logOutUser();
          this.nav.checkLogIn();
        } else {
          this.openSnackBar(
            'Ocorreu um problema ao salvar o usuário. Tente novamente'
          );
        }
        this.cancel();
      }
    );
  }

  save(): void {
    const user: User = {
      email: this.userControl.get('email')!.value!.toString(),
      password: this.userControl.get('password')!.value!.toString(),
      firstName: this.userControl.get('firstName')!.value!.toString(),
      lastName: this.userControl.get('lastName')!.value!.toString(),
      phoneNumber: this.userControl.get('phoneNumber')!.value!.toString(),
    };

    const confirmPassword = this.userControl.get('password')!.value!.toString();

    this.service.updateUser(user, this.userId).subscribe(
      () => {
        this.updateData(user.email, user.password);
      },
      (error) => {
        if (error.status == '401') {
          this.openSnackBar('Usuário deslogado. Favor realizar login.');
          this.service.logOutUser();
        } else {
          this.openSnackBar(
            'Ocorreu um problema ao salvar o usuário. Tente novamente'
          );
        }
      }
    );
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  private updateData(email: string, confirmPassword: string): void {
    this.service.verifyUser(email, confirmPassword).subscribe(
      () => {
        this.nav.checkLogIn();
        this.openSnackBar('Dados atualizados.');
        this.userControl.get('password')?.setValue('');
      },
      (error) => {
        if (error.status == '401') {
          this.openSnackBar('Usuário deslogado. Favor realizar login.');
          this.service.logOutUser();
        } else {
          if (error.status == '404') this.openSnackBar('Confirme sua senha');
        }
      }
    );
  }

  removeMessage(): void {
    this.message = false;
  }

  removeMessageError(): void {
    this.messageError = false;
  }

  cancel(): void {
    this.router.navigateByUrl('/raffles');
  }
}
