import { Injectable, computed, inject, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Country } from '../interfaces/country.intrerfcace';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GET_COUNTRIES } from '../constants/get-contries';
import { ContinentService } from './continent.service';
import { GET_COUNTRY_BY_ID } from '../constants/get-country-by-id';
import { CountryDetail } from '../interfaces/country-detail.interface';
import { ApolloQueryResult } from '@apollo/client/core/types';

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
        return this.selectedContinents().includes(country.continent.name);
      });
    }
    return contries;
  });

  public countryDetail = signal<CountryDetail | null>(null);

  public getCountry(): Observable<Country[]> {
    return this.apollo
      .watchQuery<{ countries: Country[] }>({
        query: GET_COUNTRIES,
      })
      .valueChanges.pipe(
        switchMap((result: ApolloQueryResult<{ countries: Country[] }>) => {
          const countryRequests = result.data.countries.map(
            (country: Country) => {
              return this.getImageCountry(country.name).pipe(
                map((image) => {
                  return {
                    name: country.name,
                    code: country.code,
                    continent: {
                      name: country.continent.name,
                    },
                    flag: this.getFlagCountry(country.code),
                    isSelected: false,
                    image: image,
                  };
                }),
                catchError((error) => {
                  console.error(error);
                  return of(null);
                })
              );
            }
          );
          return forkJoin(countryRequests);
        }),
        map((countries: (Country | null)[]) => {
          const validCountries = countries.filter(
            (country) => country !== null
          ) as Country[];
          this.countries.set(validCountries);
          return validCountries;
        }),
        catchError((error) => {
          console.error(error);
          return of([] as Country[]);
        })
      );
  }
  private getImageCountry(name: string) {
    const key = '34054116-27668f1eaa6231d6c30e3050f';
    const url = `https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo`;
    return this.http.get(url).pipe(
      map((result: any) => {
        const image =
          result.hits[0].webformatURL || result.hits[0].largeImageURL;
        if (!image) {
          return 'https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg';
        }

        return image;
      }),
      catchError((error) => of(error))
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

  private getFlagCountry(code: string) {
    return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
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
}
