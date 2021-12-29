import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCityPage } from './add-city.page';

const routes: Routes = [
  {
    path: '',
    component: AddCityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCityPageRoutingModule {}
