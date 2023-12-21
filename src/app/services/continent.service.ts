import { Injectable, signal } from '@angular/core';
import { Continent } from '../interfaces/continent.interface';
import { CONTINENTS } from '../mocks/continent';

@Injectable({
  providedIn: 'root',
})
export class ContinentService {
  public continent = signal<Continent[]>(CONTINENTS);
  public selectedContinents = signal<string[]>([]);
  constructor() {}

  public updateSelection(name: string) {
    this.continent.update((continents) => {
      return continents.map((continent) => {
        if (continent.name === name) {
          continent.selected = !continent.selected;
        }
        return continent;
      });
    });
    this.selectedContinent(name);
  }

  private selectedContinent(name: string) {
    this.selectedContinents.update((continents) => {
      const i = continents.indexOf(name);
      if (i > -1) {
        continents.splice(i, 1);
        return [...continents];
      } else {
        return [...continents, name];
      }
    });
  }

  public removeAllSelected() {
    this.continent.update((continents) => {
      return continents.map((continent) => {
        continent.selected = false;
        return continent;
      });
    });
    this.selectedContinents.set([]);
  }
}
