import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-02',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './view-02.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class View02Component { }
