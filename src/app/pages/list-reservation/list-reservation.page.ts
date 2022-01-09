import { Component, OnInit } from '@angular/core';
import { DataTripService } from 'src/app/services/trip/data-trip.service';
import { DataUserService } from 'src/app/services/user/data-user.service';
import { map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';
import Trip from 'src/app/model/trips';
import Reservation from 'src/app/model/reservation';
import User from 'src/app/model/user';


@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.page.html',
  styleUrls: ['./list-reservation.page.scss'],
})
export class ListReservationPage implements OnInit {
  private trips: Trip[];
  private trip: Trip;
  private reservation: Reservation;
  private reservations: Reservation[];
  private currentUser =new User;

  constructor(private userData: DataUserService,
    private tripData: DataTripService,
    private toast: ToastController,
    private alert: AlertController) {
     this.loadReservation();
    }

  ngOnInit() {
    this.userData.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      this.currentUser = data.filter(res => {
        if(res.id === this.userData.currentUser){
          this.currentUser.fullname = res.fullname;
          this.currentUser.email = res.email;
          return res;
        } 
      })[0]
    }); 
  }

  loadReservation() {
    //load all current user reservations 
    this.userData.getAllReservations().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      this.reservations = data.filter(res => (
        res.uid === this.userData.currentUser
      ));
    }); 
    
    //load the trips that has been reserved
    this.tripData.getAllTrips().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data) => {
      this.trips = data.filter(res => {
        return res.id===this.reservations.map(res => (res.tripId)).toString().split(',').find(e => e ===res.id);
      });
    }); 
  }

  async showDetails(idTrip) {
    this.trip = this.trips.find(e => e.id === idTrip);
    this.reservation = this.reservations.find(e => e.tripId === idTrip);
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
          name:'phone',
          type: 'text',
          placeholder: 'Phone Number: ' + this.reservation.phone
        },
        {
          name:'places',
          type: 'text',
          placeholder:  'Number of tickets: ' + this.reservation.places
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
          text: 'update',
          handler: (alert) => {
            console.log(alert.places);
            if(alert.places && alert.phone){
              this.reservation.places = alert.places;
              this.reservation.phone = alert.phone;
              this.reservation.totalAmount = (Number(alert.places) * Number(this.trip.price)).toString();
            }else if(alert.phone) {
              this.reservation.phone = alert.phone;
            }else if(alert.places) {
              this.reservation.places = alert.places;
              this.reservation.totalAmount = (Number(alert.places) * Number(this.trip.price)).toString();
            }
            this.updateReservation();
           }
        },
        {
          text: 'delete',
          handler: () => {
            this.deleteReservation(this.reservation.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async updateReservation() {
    this.userData.updateReservation(this.reservation.id, this.reservation);
    const updateToast = await this.toast.create({
      message: 'City Updated',
      duration: 1000
    });
    updateToast.present();
  }

  async deleteReservation(id) {
    await this.userData.deleteReservation(id);
    this.loadReservation();
  }

}
