import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RafflesService } from 'src/app/core/Raffles/raffles.service';
import { Raffle } from 'src/app/shared/models/raffle';

@Component({
  selector: 'app-raffles-list',
  templateUrl: './raffles-list.component.html',
  styleUrls: ['./raffles-list.component.css'],
})
export class RafflesListComponent implements OnInit {
  raffles: Raffle[] = [];

  constructor(private service: RafflesService, private router: Router) {}
  ngOnInit() {
    this.listRaffles();
  }

  private listRaffles(): void {
    this.service
      .getRafflesActives()
      .subscribe((raffles: Raffle[]) => this.raffles.push(...raffles));
  }

  openRaffle(id: string): void {
    this.router.navigateByUrl('/raffles/' + id);
  }
}
