import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-01',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './view-01.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class View01Component { }
