import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { CardCountryDetailComponent } from '../../components/card-country-detail/card-country-detail.component';

@Component({
  selector: 'country-detail',
  standalone: true,
  templateUrl: './country-detail.component.html',
  imports: [CommonModule, CardCountryDetailComponent],
})
export class CountryDetailComponent {
  private countryService = inject(CountryService);
  public isOpen = computed<boolean>(() =>
    this.countryService.isCountrySelected()
  );

  toggleCart() {
    this.countryService.isCountrySelected.update((value) => !value);
    this.countryService.removeDetails();
  }
}
