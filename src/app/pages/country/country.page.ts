import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCountryService } from 'src/app/services/country/data-country.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {
  private search = '';
  private resault = '';
  private countries = [];

  constructor(private data: DataCountryService,
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

  onEmptySearchValue() {
    if("" == this.search) {
      this.countryList();
      this.resault = '';
    }
  }

  searchCountry() {
    this.data.getAllCountries().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.countries = data.filter(res => {
        if(res.name == (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()))
          return res;
        else if(res.location == (this.search[0].toUpperCase() + this.search.substring(1).toLowerCase()))
          return res;
      })
    });
    this.resault = "Searched Resault";
  }

  citiesOfCountry(name) {
    this.data.selectedCounrty = name;
    this.router.navigate(['/city']);
  }

}
