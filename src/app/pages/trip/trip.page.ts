import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/city/data.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage  {
  cities = [];

  constructor(private data: DataService) {
    this.data.getCities().subscribe(res => {
      this.cities = res;
    })
  }

}
