import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RafflesListComponent } from './raffles/raffles-list/raffles-list.component';
import { RafflesModule } from './raffles/rafles.module';
import { ViewRaffleComponent } from './raffles/view-raffle/view-raffle.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { UserViewComponent } from './users/user-view/user-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'raffles',
    pathMatch: 'full',
  },
  {
    path: 'raffles',
    children: [
      {
        path: '',
        component: RafflesListComponent,
      },
      {
        path: ':id',
        component: ViewRaffleComponent,
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: ':UserId',
        component: UserViewComponent,
      },
    ],
  },
  { path: 'register', component: UserRegisterComponent },
  { path: '**', redirectTo: 'raffles' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RafflesModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
