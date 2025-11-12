import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: false,
  host: { class: 'badge-component' },
  styles: [
    `
      :host {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 12px;
        background: #e8f4ff;
        color: #034ea2;
        font-weight: 600;
        font-size: 12px;
      }
    `,
  ],
  template: ` <span>{{ label }}</span> `,
})
export class BadgeComponent {
  @Input() label = '';
}
