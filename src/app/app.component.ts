import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, SideBarComponent, CountryDetailComponent],
})
export class AppComponent {
  title = 'prueba-tecnica';
}
