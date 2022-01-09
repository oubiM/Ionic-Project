import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Reservation from 'src/app/model/reservation';
import User from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  users: AngularFireList<User> = null;
  reservations: AngularFireList<Reservation> = null;
  currentUser = "bXqADMMuXxUQKLVy6XT6ui02hmT2";
  admin = false;

  constructor(private db: AngularFireDatabase) { 
    this.users = db.list('/users');
    this.reservations = db.list('reservations/')
  }

  getAllUsers(): AngularFireList<User> {
    return this.users;
  }

  getAllReservations(): AngularFireList<Reservation> {
    return this.reservations;
  }

  createReservation(reservation: Reservation): any {
    this.db.object('/reservations/'+Math.random().toString(29).substring(3)).set({
      phone: reservation.phone,
      cin: reservation.cin,
      places: reservation.places,
      totalAmount: reservation.totalAmount,
      tripId:reservation.tripId,
      uid: reservation.uid
    });
  }

  updateReservation(id: string, value: any): Promise<void> {
    return this.reservations.update(id, value);
  }

  deleteReservation(id: string): Promise<void> {
    return this.reservations.remove(id);
  } 
}
