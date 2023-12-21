import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FilterByCountryComponent } from '../filter-by-country/filter-by-country.component';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'search-box',
  standalone: true,
  templateUrl: './search-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FilterByCountryComponent],
})
export class SearchBoxComponent implements OnInit {
  private router = inject(Router);
  private countryService = inject(CountryService);
  @ViewChild('filterByContinent')
  filterByContinent!: ElementRef;
  public isShow = signal<boolean>(false);

  ngOnInit(): void {
    console.log('FILTWER ', this.filterByContinent);
  }
  handleFocus() {
    this.isShow.update(() => true);
  }

  handleBlur(event: FocusEvent | MouseEvent) {
    this.isShow.update(() => true);
    /* if (this.isMouseCliked()) {
      this.isShow.update(() => true);
    } else {
      this.isShow.update(() => false);
    } */
  }

  isMouseCliked(event?: MouseEvent): boolean {
    console.log(this.filterByContinent);
    if (
      this.filterByContinent &&
      this.elementContains(
        this.filterByContinent.nativeElement,
        event?.target || null
      )
    ) {
      console.log('Se hizo clic dentro del div específico.');
      // Realiza acciones adicionales según sea necesario
      return true;
    } else {
      console.log('Se hizo clic fuera del div específico.');
      // Realiza acciones adicionales según sea necesario

      return false;
    }
  }

  elementContains(parent: HTMLElement, child: EventTarget | null): boolean {
    return parent.contains(child as Node);
  }

  public handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value === '') return;
    this.router.navigate(['/home', { search: value }]);
    this.countryService.searchCountry(value);
  }

  public handleUpdateShow(value: boolean) {
    this.isShow.update((show) => !show);
  }
}
