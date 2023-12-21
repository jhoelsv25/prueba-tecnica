import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'card-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-country-detail.component.html',
})
export class CardCountryDetailComponent {
  private countryService = inject(CountryService);
  public countryDetail = computed(() => this.countryService.countryDetail());

  image = computed(() => {
    const code = this.countryDetail()?.code;
    const data = this.countryService.contriesFiltered();
    if (code) {
      const image = data.filter((country) => {
        return country.code === code;
      });
      return image[0].image;
    }
    return 'https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg';
  });
}
