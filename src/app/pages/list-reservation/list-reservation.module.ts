import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListReservationPageRoutingModule } from './list-reservation-routing.module';

import { ListReservationPage } from './list-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListReservationPageRoutingModule
  ],
  declarations: [ListReservationPage]
})
export class ListReservationPageModule {}
