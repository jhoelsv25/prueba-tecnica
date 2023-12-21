import { Injectable, computed, inject, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Country } from '../interfaces/country.intrerfcace';
import { map, refCount } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GET_COUNTRIES } from '../constants/get-contries';
import { ContinentService } from './continent.service';
import { GET_COUNTRY_BY_ID } from '../constants/get-country-by-id';
import { CountryDetail } from '../interfaces/country-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private apollo = inject(Apollo);
  private countries = signal<Country[]>([]);
  private continentService = inject(ContinentService);

  private search = signal<string>('');
  private selectedContinents = computed(() =>
    this.continentService.selectedContinents()
  );

  public isCountrySelected = signal<boolean>(false);

  public contriesFiltered = computed(() => {
    const contries = this.countries();
    if (this.search() !== '') {
      return contries.filter((country) => {
        return country.name.toLowerCase().includes(this.search().toLowerCase());
      });
    } else if (this.selectedContinents().length > 0) {
      return contries.filter((country) => {
        return this.selectedContinents().includes(country.continent);
      });
    }
    return contries;
  });

  public countryDetail = signal<CountryDetail | null>(null);

  public getCountry() {
    return this.apollo
      .watchQuery({
        query: GET_COUNTRIES,
      })
      .valueChanges.pipe(
        map((result: any) => {
          const countries = result.data.countries.map((country: any) => {
            return {
              name: country.name,
              code: country.code,
              continent: country.continent.name,
              flag: this.getFlagCountry(country.code),
              image: this.getImageCountry(country.name),
              isSelected: false,
            };
          });
          this.countries.set(countries);
          return countries;
        })
      );
  }

  public getCountryByCode(code: string) {
    return this.apollo
      .watchQuery({
        query: GET_COUNTRY_BY_ID,
        variables: {
          code: code,
        },
      })
      .valueChanges.pipe(
        map((res: any) => {
          const data = res.data;
          const newData = {
            ...data.country,
            flag: this.getFlagCountry(data.country.code),
          };
          this.countryDetail.set(newData);

          return newData;
        })
      );
  }

  public viewDetails(code: string) {
    this.countries.update((prev) => {
      this.isCountrySelected.update(() => true);
      return prev.map((value) =>
        value.code === code
          ? { ...value, isSelected: !value.isSelected }
          : { ...value, isSelected: false }
      );
    });
  }

  public removeDetails() {
    this.isCountrySelected.update(() => false);
    this.countries.update((prev) => {
      return prev.map((value) => {
        return { ...value, isSelected: false };
      });
    });
  }

  public searchCountry(country: string) {
    this.search.set(country);
  }

  private getImageCountry(country: string) {
    const key = '34054116-27668f1eaa6231d6c30e3050f';
    const url = `https://pixabay.com/api/?key=${key}&q=${country}&image_type=photo`;
    return this.http.get(url).pipe(
      map((result: any) => {
        const image = result.hits[0].webformatURL;
        return image;
      })
    );
  }
  private getFlagCountry(code: string) {
    return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
  }
}
