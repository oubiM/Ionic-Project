import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import City from 'src/app/model/city';
import { DataService } from 'src/app/services/city/data.service';
import { DataCountryService } from 'src/app/services/country/data-country.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.page.html',
  styleUrls: ['./add-city.page.scss'],
})
export class AddCityPage {
  private city: City = new City();
  private imagePth = [];
  private task: AngularFireUploadTask;
  private ref: AngularFireStorageReference;
  private countries = [];

  constructor(private country: DataCountryService,
    private data: DataService,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.loadCountries();
  }

  loadCountries() {
    this.country.getAllCountries().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.countries = data;
    });
  }

  async onFileSelected(event) {
    const path =event.target.files[0]['name'];
    this.ref = this.storage.ref(path);
    this.task = this.ref.put(event.target.files[0]);
    await this.task.then(res => {
      res.ref.getDownloadURL().then(url => {
        this.imagePth.push(url);
      })
    })
    console.log(this.imagePth);
  }

  addCity(): void {
    this.city.places = (this.city.places.toString()).split(',');
    this.city.image=this.imagePth;
    console.log(this.city.image);
    this.data.createCity(this.city).then(() => {
      console.log('City created successfully!');
    });
  }

  clear(): void {
    this.city.name = "";
    this.city.country = "";
    this.city.coordinates = "";
    this.city.history = "";
    this.city.places = [];
  }

  back() {
    this.country.selectedCounrty = this.city.country;
    this.router.navigate(['/city']);
  }
}
