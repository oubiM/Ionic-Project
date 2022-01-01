import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillbasePageRoutingModule } from './fillbase-routing.module';

import { FillbasePage } from './fillbase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FillbasePageRoutingModule
  ],
  declarations: [FillbasePage]
})
export class FillbasePageModule {}
