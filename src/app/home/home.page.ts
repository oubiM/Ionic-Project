import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private cities = [];

  constructor(private data: DataService,
    private router: Router,
    private updateModel: ModalController
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

  cityDetail(id) {
    this.router.navigate([`city-details/${id}`]);
  }
}
