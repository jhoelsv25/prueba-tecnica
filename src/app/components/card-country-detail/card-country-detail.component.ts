import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'card-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-country-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCountryDetailComponent {
  private countryService = inject(CountryService);
  public countryDetail = computed(() => this.countryService.countryDetail());
}
