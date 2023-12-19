import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { SidebarItem } from '../../interfaces/sidebar.interface';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'side-bar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent implements OnInit {
  items = signal<SidebarItem[]>([]);

  ngOnInit(): void {
    this.items.set([
      {
        name: 'home',
        link: '/home',
      },
      {
        name: 'vista 01',
        link: '/view-01',
      },
      {
        name: 'vista 02',

        link: '/view-02',
      },
      {
        name: 'vista 03',
        link: '/view-03',
      },
    ]);
  }
}
