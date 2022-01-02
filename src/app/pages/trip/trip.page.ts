import { Component, OnInit } from '@angular/core';
import { DataTripService } from 'src/app/services/trip/data-trip.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage  {
  private trips;
  private dateStart= new Date('');
  private dateEnd= new Date('');
  private search = '';

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

  searchTrips() {
    if(this.dateStart.toString() === 'Invalid Date' && this.dateEnd.toString() === 'Invalid Date')
      this.searchWithCity();
    else if(!this.search) 
      this.searchWithDate();
    else 
      this.searchWithDateAndCity();

  }

  searchWithCity() {
     if(this.search.split(' ')[0] === 'from'){
      this.search = this.search.split(' ')[1];
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(this.data.tripTrans)
            return res.transport === this.data.tripTrans && (res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()));
          else
            return res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
        });
      });
      console.log((this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()));
    } else if(this.search.split(' ')[0] === 'to') {
      this.search = this.search.split(' ')[1];
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(this.data.tripTrans)
            return res.transport === this.data.tripTrans && (res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()));
          else
            return res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
        });
      });
    } else if(this.search.split(' ')[0] !== 'to' && this.search.split(' ')[0] !== 'from') {
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(res.transport === this.data.tripTrans) {
            console.log('test')
            return res.transport === this.data.tripTrans && res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) || res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
          }else if('' === this.data.tripTrans)
            return res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) || res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
        });
      });
    } 
  }

  searchWithDate() {
    
    if(this.dateStart.toString() === 'Invalid Date' &&  this.dateEnd)
    {     
      console.log(this.dateStart)
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(this.data.tripTrans)
            return this.isDatesEqual(this.dateEnd,res.end) && res.transport === this.data.tripTrans;
          else
            return this.isDatesEqual(this.dateEnd,res.end);
        });
      });
    } else if(this.dateStart &&  this.dateEnd.toString() === 'Invalid Date')
    {     
      console.log(this.dateStart)
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(this.data.tripTrans)
            return this.isDatesEqual(res.start,this.dateStart) && res.transport === this.data.tripTrans;
          else
            return this.isDatesEqual(res.start,this.dateStart);
        });
      });
    } else if(this.dateStart &&  this.dateEnd) {
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

  searchWithDateAndCity() {
    if(this.dateStart.toString() !== 'Invalid Date' &&  this.dateEnd.toString() !== 'Invalid Date' && this.search.split(' ')[0] === 'from'){
      console.log('if 1');
      this.search = this.search.split(' ')[1];
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(this.data.tripTrans)
            return this.isDatesEqual(res.start,this.dateStart) && this.isDatesEqual(this.dateEnd,res.end) && res.transport === this.data.tripTrans && (res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()));
          else if(res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()))
            return this.isDatesEqual(res.start,this.dateStart) && this.isDatesEqual(this.dateEnd,res.end);
        });
      });
      console.log((this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()));
    } else if(this.dateStart.toString() !== 'Invalid Date' &&  this.dateEnd.toString() !== 'Invalid Date' && this.search.split(' ')[0] === 'to') {
      console.log('if 2');
      this.search = this.search.split(' ')[1];
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(this.data.tripTrans)
            return this.isDatesEqual(res.start,this.dateStart) && this.isDatesEqual(this.dateEnd,res.end) && res.transport === this.data.tripTrans && (res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()));
          else if(res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()))
            return this.isDatesEqual(res.start,this.dateStart) && this.isDatesEqual(this.dateEnd,res.end);
        });
      });
    } else if(this.dateStart.toString() !== 'Invalid Date' &&  this.dateEnd.toString() !== 'Invalid Date' && this.search.split(' ')[0] && this.search) {
      console.log('if 3');
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(res.transport === this.data.tripTrans) {
            return this.isDatesEqual(res.start,this.dateStart) && this.isDatesEqual(this.dateEnd,res.end) && res.transport === this.data.tripTrans && res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) || res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
          }else if('' === this.data.tripTrans)
            return this.isDatesEqual(res.start,this.dateStart) && this.isDatesEqual(this.dateEnd,res.end) && res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) || res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
        });
      });
    } else if(this.dateStart.toString() === 'Invalid Date' &&  this.dateEnd && this.search)
    {     
      console.log('if 4');
      console.log(this.search);
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(this.data.tripTrans)
            return this.isDatesEqual(this.dateEnd,res.end) && res.transport === this.data.tripTrans && res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) || res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
          else if (this.isDatesEqual(this.dateEnd,res.end))
            return res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) || res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
        });
      });
    } else if(this.dateStart &&  this.dateEnd.toString() === 'Invalid Date' && this.search)
    {     
      console.log('last if');
      console.log(this.dateStart)
      this.data.getAllTrips().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.trips = data.filter(res => {
          if(this.data.tripTrans)
            return this.isDatesEqual(res.start,this.dateStart) && res.transport === this.data.tripTrans &&  res.transport === this.data.tripTrans && res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) || res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
          else if(this.isDatesEqual(res.start,this.dateStart))
            return res.to === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()) || res.from === (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase());
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
    this.dateStart = new Date('');
    this.dateEnd = new Date('');
    //this.data.tripTrans = '';
    this.search = '';
    this.loadTrip();
  }

}
