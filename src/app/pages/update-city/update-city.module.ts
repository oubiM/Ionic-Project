import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCityPageRoutingModule } from './update-city-routing.module';

import { UpdateCityPage } from './update-city.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCityPageRoutingModule
  ],
  declarations: [UpdateCityPage]
})
export class UpdateCityPageModule {}
