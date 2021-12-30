import { Component, OnInit } from '@angular/core';
import City from 'src/app/model/city';
import { DataService } from 'src/app/services/city/data.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.page.html',
  styleUrls: ['./add-city.page.scss'],
})
export class AddCityPage implements OnInit {
  city: City = new City();
  imagePth = [];

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.imagePth.push('..\/..\/assets\/'+event.target.files[0]['name']);
    console.log(this.imagePth);
  }

  addCity(): void {
    this.city.places = (this.city.places.toString()).split(',');
    this.city.image=this.imagePth;
    console.log(this.city.image);
    this.data.createCity(this.city).then(() => {
      console.log('City created successfully!');
    });
  }

  clear(): void {
    this.city.name = "";
    this.city.country = "";
    this.city.coordinates = "";
    this.city.history = "";
    this.city.places = [];
  }
}
