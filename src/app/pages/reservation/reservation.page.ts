import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  id_trip: string;
  id_user: string;
  username: string;
  email: string;
  id_card: string;
  nbr_place: number;
  price: number;


  constructor() { }

  ngOnInit() {
  }

}
