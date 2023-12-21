import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CountryService } from '../../services/country.service';
import { ContinentService } from '../../services/continent.service';

@Component({
  selector: 'card-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-country.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCountryComponent {
  private countryService = inject(CountryService);
  private continetService = inject(ContinentService);

  public selectedCountry = computed(() =>
    this.continetService.selectedContinents()
  );

  ngOnInit(): void {
    console.log('selected contries', this.selectedCountry());
  }

  public countries = computed(() => this.countryService.contriesFiltered());

  public viewDetail(code: string) {
    this.countryService.viewDetails(code);
    this.countryService.getCountryByCode(code).subscribe();
  }
}
