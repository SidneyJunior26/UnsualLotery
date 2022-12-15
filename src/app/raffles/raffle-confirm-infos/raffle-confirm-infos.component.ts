import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/Users/users.service';
import { Raffle } from 'src/app/shared/models/raffle';

@Component({
  selector: 'app-raffle-confirm-infos',
  templateUrl: './raffle-confirm-infos.component.html',
  styleUrls: ['./raffle-confirm-infos.component.css'],
})
export class RaffleConfirmInfosComponent implements OnInit {
  raffle: Raffle;
  hide = true;

  userControl = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UsersService,
    private dialogRef: MatDialogRef<RaffleConfirmInfosComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    var token = localStorage.getItem('currentUser');

    if (token != null) {
      var userInfo = this.userService.getDecodedAccessToken(token);

      this.userControl.get('firstName')?.setValue(userInfo.FirstName);
      this.userControl.get('lastName')?.setValue(userInfo.LastName);
      this.userControl.get('email')?.setValue(userInfo.Email);
      this.userControl.get('phoneNumber')?.setValue(userInfo.PhoneNumber);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
