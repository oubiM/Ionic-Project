import { NgModule, ViewChild, ViewChildren } from '@angular/core';
import { ChildrenOutletContexts, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'city',
    loadChildren: () => import('./city/city.module').then( m => m.CityPageModule)
  },
  {
    path: '',
    redirectTo: 'country',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'city-details/:cityId',
    loadChildren: () => import('./pages/city-details/city-details.module').then( m => m.CityDetailsPageModule)
  },
  {
    path: 'add-city',
    loadChildren: () => import('./pages/add-city/add-city.module').then( m => m.AddCityPageModule)
  },
  {
    path: 'update-city',
    loadChildren: () => import('./pages/update-city/update-city.module').then( m => m.UpdateCityPageModule)
  },
  {
    path: 'country',
    loadChildren: () => import('./pages/country/country.module').then( m => m.CountryPageModule)
  },
  {
    path: 'trips',
    loadChildren: () => import('./pages/trip/trip.module').then( m => m.TripPageModule)
  },
  {
    path: 'f',
    loadChildren: () => import('./fillbase/fillbase.module').then( m => m.FillbasePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
