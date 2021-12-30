import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/city/data.service';
import { map } from 'rxjs/operators';
import { AddCityPage } from '../pages/add-city/add-city.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private cities = [];

  constructor(private data: DataService,
    private router: Router,
    private addModel: ModalController
    ) {
    this.data.getAllCities().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.cities = data;
      console.log(this.cities[0]['image']);
    });
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
}
