import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RafflesService } from 'src/app/core/Raffles/raffles.service';
import { Raffle } from 'src/app/shared/models/raffle';
import { RaffleConfirmInfosComponent } from '../raffle-confirm-infos/raffle-confirm-infos.component';

@Component({
  selector: 'app-view-raffle',
  templateUrl: './view-raffle.component.html',
  styleUrls: ['./view-raffle.component.css'],
})
export class ViewRaffleComponent implements OnInit {
  id: string;
  raffles: Raffle[] = [];
  quantityControl: FormControl;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routeService: RafflesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.showRaffle();
  }

  cancel(): void {
    this.router.navigateByUrl('/raffles');
  }

  confirmUser(): void {
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(RaffleConfirmInfosComponent, {
      width: '500px',
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.checkLogIn();
    // });
  }

  private showRaffle(): void {
    this.routeService.viewRaffle(this.id).subscribe((raffles: Raffle[]) => {
      this.raffles.push(...raffles);
      this.quantityControl = new FormControl('1', [
        Validators.required,
        Validators.min(1),
        Validators.max(raffles[0].availableQuantity),
      ]);
    });
  }
}
