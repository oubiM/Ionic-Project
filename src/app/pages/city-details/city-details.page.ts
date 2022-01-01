import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import City from 'src/app/model/city';
import { DataService } from 'src/app/services/city/data.service';
import { map } from 'rxjs/operators';
import { UpdateCityPage } from '../update-city/update-city.page';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.page.html',
  styleUrls: ['./city-details.page.scss'],
})
export class CityDetailsPage implements OnInit {
  private loadedCity: City;
  private selectedSegment: string = "detailCity";

  constructor(private router: Router,
    private data: DataService,
    private activedRoute: ActivatedRoute,
    private alert: AlertController,
    private updateModel: ModalController 
  ) {}

  ngOnInit() {
    let name = this.activedRoute.snapshot.paramMap.get('cityId');
    this.data.getAllCities().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.loadedCity = data.filter(res => {
        return res.name == name;
      })[0];
    });
  }

  async updatedCity () {
    const modal = await this.updateModel.create({
      component: UpdateCityPage,
      componentProps: {city: this.loadedCity},
      breakpoints: [0, 0.5, 0.75],
      initialBreakpoint: 0.5
    });
    modal.present();
  }

  deleteCity() {
    this.alert.create({cssClass: 'alertBox', header: 'Warning', message: 'do you really want to delete this city?',
    buttons:[
      {
        text: 'cancel',
        role: 'cancel'
      },
      {
        text: 'delete',
        handler: () => {
          this.data.deletecity(this.loadedCity.id);
          this.router.navigate(['../home']);
        }
      }
    ]
    })
    .then(alert => {
      alert.present();
    });
  }

  segmentChanged(event) {
    this.selectedSegment = event.target.value;
    console.log(this.selectedSegment);
  }

}
