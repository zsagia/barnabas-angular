import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: false,
  template: `
    <span
      style="background:#007bff;color:white;padding:4px 8px;border-radius:12px;font-size:12px"
      >{{ label }}</span
    >
  `,
})
export class BadgeComponent {
  @Input() label = '';
}
