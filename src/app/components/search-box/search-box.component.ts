import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FilterByCountryComponent } from '../filter-by-country/filter-by-country.component';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search-box',
  standalone: true,
  templateUrl: './search-box.component.html',
  imports: [CommonModule, FilterByCountryComponent],
})
export class SearchBoxComponent {
  private router = inject(Router);
  private countryService = inject(CountryService);
  public isShow = signal<boolean>(false);
  @ViewChild('filterByContinent')
  filterByContinent!: ElementRef;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  handleFocus(event: Event) {
    event.stopPropagation();
    this.isShow.update(() => true);
  }

  public handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value === '') return;
    this.router.navigate(['/home', { search: value }]);
    this.isShow.update(() => false);
    this.countryService.searchCountry(value);
  }

  public handleUpdateShow(value: boolean) {
    this.isShow.update((show) => !show);
  }
}
