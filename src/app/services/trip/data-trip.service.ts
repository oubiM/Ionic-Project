import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Trip from 'src/app/model/trips';

@Injectable({
  providedIn: 'root'
})
export class DataTripService {
  private path = '/trips';
  tripTrans = '';
  trips: AngularFireList<Trip> = null;

  constructor(private db: AngularFireDatabase) {
    this.trips = db.list(this.path);
  }

  getAllTrips(): AngularFireList<Trip> {
    return this.trips;
  }

  createCity(city: Trip): any {
    return this.trips.push(city);
  }

}