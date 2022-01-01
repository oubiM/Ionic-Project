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
  dateStart: Date;
  dateEnd: Date;

  constructor(private data: DataTripService) {
    this.loadTrip();
  }

  loadTrip() {
    console.log(this.data.tripTrans);
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
    }
    else if(this.data.tripTrans == 'bus')
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

  searchWithDate() {
    if(this.dateStart &&  this.dateEnd )
    {     
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(this.data.tripTrans)
            return this.isDatesEqual(res.start,this.dateStart) && this.isDatesEqual(this.dateEnd,res.end) && res.transport === this.data.tripTrans;
          else
            return this.isDatesEqual(res.start,this.dateStart) && this.isDatesEqual(this.dateEnd,res.end);
        });
      });
    } 
  }

  isDatesEqual(start, end) {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);

    return (dateStart.getFullYear() >= dateEnd.getFullYear() &&
    dateStart.getMonth() >= dateEnd.getMonth() &&
    dateStart.getDate() >= dateEnd.getDate()) 
    || 
    ( dateStart.getFullYear() === dateEnd.getFullYear() &&
    dateStart.getMonth() === dateEnd.getMonth() &&
    dateStart.getDate() === dateEnd.getDate());
  }

  refresh() {
    this.data.tripTrans = '';
  }



}
