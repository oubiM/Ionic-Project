import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCountryService } from 'src/app/services/country/data-country.service';
import { map } from 'rxjs/operators';
import { DataTripService } from 'src/app/services/trip/data-trip.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {
  private search = '';
  private result = '';
  private countries = [];

  constructor(private data: DataCountryService,
    private tripTrns: DataTripService,
    private router: Router
  ) {
    this.countryList();
  }

  ngOnInit() {
  }

  countryList() {
    this.data.getAllCountries().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.countries = data;
    });
  }

  onSearchValue() {
    if(this.search) {
      this.result = "Searched Result";
      this.data.getAllCountries().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.countries = data.filter(res => {
          if((res.name.includes(this.search[0].toUpperCase() + this.search.substring(1).toLowerCase())) || 
            (res.location.includes(this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()))
          )
            return res;
          else if (res.name.includes(this.search) || res.name.includes(this.search))
            return res;
        })
      });
    } else {
      this.countryList();
      this.refresh();
    }
  }


  citiesOfCountry(name) {
    this.data.selectedCounrty = name;
    this.router.navigate(['/city']);
  }

  refresh() {
    this.search = '';
    this.result = '';
    this.tripTrns.tripTrans = '';
  }
  
  trip(trans) {
    this.tripTrns.tripTrans = trans;
    this.router.navigate(['/trips']);
  }
}
