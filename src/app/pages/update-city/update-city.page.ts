import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import City from 'src/app/model/city';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.page.html',
  styleUrls: ['./update-city.page.scss'],
})
export class UpdateCityPage implements OnInit {
  @Input() city: City;
  

  constructor(private data: DataService,
     private model: ModalController,
     private toast: ToastController,
     private router: Router
     ) { }

  ngOnInit() {
  }

  async updateCity() {
    this.data.updatecity(this.city.id, this.city);
    const updateToast = await this.toast.create({
      message: 'City Updated',
      duration: 1000
    });
    updateToast.present();
  }

  async deleteCity() {
   await this.data.deleteCity(this.city);
    this.router.navigateByUrl('/home');
   this.model.dismiss();
  }

}
