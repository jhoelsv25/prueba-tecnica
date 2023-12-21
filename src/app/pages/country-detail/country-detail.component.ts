import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { CardCountryDetailComponent } from '../../components/card-country-detail/card-country-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'country-detail',
  standalone: true,
  templateUrl: './country-detail.component.html',
  imports: [CommonModule, CardCountryDetailComponent],
})
export class CountryDetailComponent {
  private router = inject(Router);
  private countryService = inject(CountryService);
  public isOpen = computed<boolean>(() =>
    this.countryService.isCountrySelected()
  );

  toggleDetail() {
    this.countryService.isCountrySelected.update((value) => !value);
    this.countryService.removeDetails();
    this.router.navigate(['/home']);
  }
}
