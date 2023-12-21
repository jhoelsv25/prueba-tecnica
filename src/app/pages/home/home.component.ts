import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { FilterByCountryComponent } from '../../components/filter-by-country/filter-by-country.component';
import { CardCountryComponent } from '../../components/card-country/card-country.component';
import { CountryService } from '../../services/country.service';
interface Continent {
  label: string;
  selected: boolean;
}
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SearchBoxComponent,
    FormsModule,
    FilterByCountryComponent,
    CardCountryComponent,
  ],
})
export class HomeComponent implements OnInit {
  private countryService = inject(CountryService);

  ngOnInit(): void {
    this.countryService.getCountry().subscribe();
  }
}
