import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material/material.module';
import { RafflesListComponent } from './raffles-list/raffles-list.component';
import { ViewRaffleComponent } from './view-raffle/view-raffle.component';
import { RaffleConfirmInfosComponent } from './raffle-confirm-infos/raffle-confirm-infos.component';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  declarations: [RafflesListComponent, ViewRaffleComponent, RaffleConfirmInfosComponent],
})
export class RafflesModule {}
