import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListReservationPage } from './list-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: ListReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListReservationPageRoutingModule {}
