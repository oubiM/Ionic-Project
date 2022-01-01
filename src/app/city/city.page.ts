import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/city/data.service';
import { map } from 'rxjs/operators';
import { AddCityPage } from '../pages/add-city/add-city.page';
import { DataCountryService } from '../services/country/data-country.service';

@Component({
  selector: 'app-city',
  templateUrl: 'city.page.html',
  styleUrls: ['city.page.scss'],
})
export class CityPage {
  private cities = [];
  private search = '';

  constructor(private data: DataService,
    private country: DataCountryService,
    private router: Router,
    private addModel: ModalController
    ) {
      this.loadcities();
  }

  loadcities() {
    if(this.country.selectedCounrty !=='') {    
      this.data.getAllCities().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.cities = data.filter(res => {
          return res.country == this.country.selectedCounrty;
        })
      });
    } else {
      this.data.getAllCities().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.cities = data.filter(res => {
          return res;
        })
      });
    }
  }

  async addCity() {
    const modal = await this.addModel.create({
      component: AddCityPage,
      breakpoints: [0, 0.5, 0.7],
      initialBreakpoint: 0.5
    });
    modal.present();
  }

  cityDetail(id) {
    this.router.navigate([`city-details/${id}`]);
  }

  onSearchValue() {
    if(this.search) {
      console.log(this.search);
      this.data.getAllCities().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.cities = data.filter(res => {
          if(res.name.includes(this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) && res.country == this.country.selectedCounrty)
            return res;
          else if (res.name.includes(this.search) && res.country == this.country.selectedCounrty)
            return res;
        })
      });
    } else {

      this.loadcities();
    }
  }
}
