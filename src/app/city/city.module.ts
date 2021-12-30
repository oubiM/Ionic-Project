import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CityPage } from './city.page';

import { CityPageRoutingModule } from './city-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CityPageRoutingModule
  ],
  declarations: [CityPage]
})
export class CityPageModule {}
