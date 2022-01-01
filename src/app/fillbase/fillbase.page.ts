import { Component, OnInit } from '@angular/core';
import Trip from '../model/trips';
import { DataTripService } from '../services/trip/data-trip.service';

@Component({
  selector: 'app-fillbase',
  templateUrl: './fillbase.page.html',
  styleUrls: ['./fillbase.page.scss'],
})
export class FillbasePage implements OnInit {
  trip: Trip = new Trip();
  
  constructor(private data: DataTripService) { }

  ngOnInit() {
  }

  addCity(): void {
    console.log(this.trip.image);
    this.data.createCity(this.trip).then(() => {
      console.log('trip created successfully!');
    });
  }
}
