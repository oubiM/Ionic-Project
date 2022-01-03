import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Reservation from 'src/app/model/reservation';
import User from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  users: AngularFireList<User> = null;
  currentUser = 'bXqADMMuXxUQKLVy6XT6ui02hmT2';
  admin = false;

  constructor(private db: AngularFireDatabase) { 
    this.users = db.list('/users');
  }

  getAllUsers(): AngularFireList<User> {
    return this.users;
  }

  updatecity(id: string, value: any): Promise<void> {
    return this.users.update(id, value);
  }

  createReservation(reservation: Reservation): any {
    this.db.object('/reservations/'+Math.random().toString(29).substring(3)).set({
      phone: reservation.phone,
      cin: reservation.cin,
      nbrPlace: reservation.places,
      totalAmount: reservation.totalAmount,
      tripId:reservation.tripId,
      uid: reservation.uid
    });
  }

}
