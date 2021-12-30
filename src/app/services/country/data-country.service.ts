import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Country from 'src/app/model/country';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataCountryService {
  private path = '/countries';
  selectedCounrty;
  country: AngularFireList<Country> = null;

  constructor(private db: AngularFireDatabase) {
    this.country = db.list(this.path);
  }

  getAllCountries(): AngularFireList<Country> {
    return this.country;
  }
}
