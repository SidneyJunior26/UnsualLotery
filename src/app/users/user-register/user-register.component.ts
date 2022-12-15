import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/Users/users.service';
import { User } from 'src/app/shared/models/user';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  message: boolean = false;
  messageError: boolean = false;

  userControl = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  constructor(
    private service: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private nav: NavbarComponent
  ) {}

  ngOnInit(): void {}

  register(): void {
    const user: User = {
      email: this.userControl.get('email')!.value!.toString(),
      password: this.userControl.get('password')!.value!.toString(),
      firstName: this.userControl.get('firstName')!.value!.toString(),
      lastName: this.userControl.get('lastName')!.value!.toString(),
      phoneNumber: this.userControl.get('phoneNumber')!.value!.toString(),
    };

    this.service.createUser(user).subscribe(
      () => {
        this.openSnackBar('Usuário criado com sucesso!');
        this.nav.openDialog();
      },
      (error) => {
        if (error.status == '401')
          this.openSnackBar(
            'Ocorreu um problema ao criar o usuário. Tente novamente mais tarde.'
          );
      }
    );
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
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
