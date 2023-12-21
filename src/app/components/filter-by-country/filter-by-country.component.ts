import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { ContinentService } from '../../services/continent.service';

@Component({
  selector: 'filter-by-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-by-country.component.html',
})
export class FilterByCountryComponent {
  private countryService = inject(CountryService);
  private continentService = inject(ContinentService);
  public continent = computed(() => this.continentService.continent());

  updateSelection(name: string) {
    this.continentService.updateSelection(name);
  }

  removeAllSelected() {
    this.continentService.removeAllSelected();
  }
}
