import { Component, OnInit } from '@angular/core';
import { DataTripService } from 'src/app/services/trip/data-trip.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage  {
  trips;
  
  constructor(private data: DataTripService) {
    console.log(data.tripTrans);
    if(this.data.tripTrans == '') {
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data;
      });
    } else {
      this.loadTrip();
    }
  }

  loadTrip() {
    if(this.data.tripTrans == 'bus')
    {
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          return res.transport == this.data.tripTrans;
        });
      });
    } else if(this.data.tripTrans == 'boat') {
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          return res.transport == this.data.tripTrans;
        });
      });
    } else if(this.data.tripTrans == 'flight') {
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          return res.transport == this.data.tripTrans;
        });
      });
    }
  }

}
