import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { collectionData, Firestore, collection, doc, docData, addDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import City from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private path = '/cities';
  citiesRef: AngularFireList<City> = null;

  constructor(private fireStore: Firestore,
    private db: AngularFireDatabase
    ) { 
      this.citiesRef = db.list(this.path);
    }

  getAllCities(): AngularFireList<City> {
    return this.citiesRef;
  }

  createCity(city: City): any {
    return this.citiesRef.push(city);
  }

  updatecity(id: string, value: any): Promise<void> {
    return this.citiesRef.update(id, value);
  }

  deletecity(id: string): Promise<void> {
    return this.citiesRef.remove(id);
  }  

  //#region Firestore
  getCities(): Observable<City[]> {
    const cityRef = collection(this.fireStore, 'City\'s');
    return collectionData(cityRef, { idField: 'id' }) as Observable<City[]>;
  }

  getCityById(id): Observable<City> {
    const cityRef = doc(this.fireStore, `City's/${id}`);
    return docData(cityRef, {idField: 'id'}) as Observable<City>;
  }

  addCity(city: City) {
    const cityRef = collection(this.fireStore, `City's`);
    return addDoc(cityRef, city);
  }

  deleteCity(city: City) {
    const cityRef = doc(this.fireStore, `City's/${city.id}`);
    return deleteDoc(cityRef);
  }

  updateCity(city: City) {
    const cityRef = doc(this.fireStore, `City's/${city.id}`);
    console.log(city);
    return updateDoc(cityRef, {
      name: city.name,
      country: city.country,
      history: city.history,
      //places: city.places
    });
  }
  //#endregion
}
