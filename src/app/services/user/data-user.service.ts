import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Reservation from 'src/app/model/reservation';
import User from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {
  users: AngularFireList<User> = null;
  currentUser;
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
    this.db.object('/reservations' + this.currentUser).set({
      phone: reservation.phone,
      cin: reservation.cin,
      nbrPlace: reservation.nbrPlace,
      totalAmount: reservation.totalAmount,
      tripId:reservation.tripId
    });
  }

}
