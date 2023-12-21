import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
  @Input() styleClass: string = 'flex flex-col gap-3 py-5';
  @Input() classActived: string = 'capitalize';
  @Input() showIcon: string = 'hidden';
  public items = signal<SidebarItem[]>([]);

  ngOnInit(): void {
    this.items.set([
      {
        name: 'home',
        link: '/home',
        icon: 'assets/home.svg',
      },
      {
        name: 'vista 01',
        link: '/view-01',
        icon: 'assets/custom.svg',
      },
      {
        name: 'vista 02',
        icon: 'assets/custom.svg',
        link: '/view-02',
      },
      {
        name: 'vista 03',
        icon: 'assets/custom.svg',
        link: '/view-03',
      },
    ]);
  }
}
