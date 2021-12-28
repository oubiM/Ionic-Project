import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCityPageRoutingModule } from './add-city-routing.module';

import { AddCityPage } from './add-city.page';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCityPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AddCityPage]
})
export class AddCityPageModule {}
