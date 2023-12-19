import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-03',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './view-03.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class View03Component { }
