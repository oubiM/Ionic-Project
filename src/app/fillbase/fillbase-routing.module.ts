import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FillbasePage } from './fillbase.page';

const routes: Routes = [
  {
    path: '',
    component: FillbasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FillbasePageRoutingModule {}
