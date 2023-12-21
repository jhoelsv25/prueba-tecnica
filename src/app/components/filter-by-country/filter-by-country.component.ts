import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  computed,
  inject,
} from '@angular/core';
import { ContinentService } from '../../services/continent.service';

@Component({
  selector: 'filter-by-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-by-country.component.html',
})
export class FilterByCountryComponent {
  private continentService = inject(ContinentService);
  public continent = computed(() => this.continentService.continent());
  @Output() isShow = new EventEmitter<boolean>();

  updateSelection(name: string) {
    this.continentService.updateSelection(name);
  }

  removeAllSelected() {
    this.continentService.removeAllSelected();
    this.isShow.emit(false);
  }
}
