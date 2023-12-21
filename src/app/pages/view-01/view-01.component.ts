import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-01',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="container mx-auto h-full md:p-10 p-3">
    <h2 class="font-bold text-zinc-700">Hola! Esta es la vista 01</h2>
  </div> `,
})
export class View01Component {}
