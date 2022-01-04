import { Component, OnInit } from '@angular/core';
import Reservation from 'src/app/model/reservation';
import User from 'src/app/model/user';
import { DataUserService } from 'src/app/services/user/data-user.service';
import { DataTripService } from 'src/app/services/trip/data-trip.service';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import Trip from 'src/app/model/trips';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  private reservation= new Reservation;
  private currentUser =new User;
  private trip =new Trip ;
  
  constructor(private user: DataUserService,
    private tripId: DataTripService,
    private alert: AlertController,
    private router: Router) {}

  ngOnInit() {
    this.user.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      this.currentUser = data.filter(res => {
        if(res.id === this.user.currentUser){
          this.currentUser.fullname = res.fullname;
          this.currentUser.email = res.email;
          return res;
        } 
      })[0]
    }); 

    this.tripId.getAllTrips().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      this.trip = data.filter(res => {
        if(res.id === this.tripId.tripId){
          return res;
        } 
      })[0]
    }); 
  }

  async addReservation() {
    this.reservation.totalAmount = (Number(this.reservation.places) * Number(this.tripId.amount)).toString();
/*     this.reservation.tripId = this.tripId.tripId;
    this.reservation.uid = this.user.currentUser;
    this.user.createReservation(this.reservation); */

    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Reserved!',
      inputs: [
        {
          type: 'text',
          disabled: true,
          value: 'Fullname: ' + this.currentUser.fullname
        },
        {
          type: 'text',
          disabled: true,
          value: 'Phone Number: ' + this.reservation.phone
        },
        {
          type: 'text',
          disabled: true,
          value: 'Number of tickets: ' + this.reservation.places
        },
        {
          type: 'text',
          disabled: true,
          value: 'Trip destination : ' + this.trip.from + ' To ' + this.trip.to
        },
        {
          type: 'text',
          disabled: true,
          value: 'Trip start : ' + this.trip.start
        },
        {
          type: 'text',
          disabled: true,
          value: 'Trip end  : ' +  this.trip.end
        },
        {
          type: 'text',
          disabled: true,
          value: 'Total amount : ' + this.reservation.totalAmount
        }
      ],
      buttons: [
        {
          text: 'Back to home',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['../country'])
          }
        }
      ]
    });

    await alert.present();
  }

  onFileSelected(event) {
    this.reservation.cin = String(event.target.value).split('\\')[2];
  }

}
