import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { ContinentService } from '../../services/continent.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-country',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-country.component.html',
})
export class CardCountryComponent {
  private countryService = inject(CountryService);
  private continetService = inject(ContinentService);
  public message = signal<string>(
    'Espere por favor esta cargando los paises...'
  );
  public selectedCountry = computed(() =>
    this.continetService.selectedContinents()
  );

  ngOnInit(): void {
    this.countryService.getCountry().subscribe({
      next: () => {},
      error: (err) => {
        this.message.set('Hubo un error al traer los datos');
      },
      complete: () => {
        this.message.set('Completed');
      },
    });
  }

  public countries = computed(() => this.countryService.contriesFiltered());

  public viewDetail(code: string) {
    this.countryService.viewDetails(code);
    this.countryService.getCountryByCode(code).subscribe();
  }
}
