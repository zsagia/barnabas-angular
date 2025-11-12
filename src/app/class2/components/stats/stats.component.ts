import { Component, Input } from '@angular/core';

type Todo = { text: string; done: boolean };

@Component({
  selector: 'app-stats',
  standalone: false,
  host: { 'class': 'stats-component' },
  styles: [
    `:host { display: block; padding: 8px 12px; border-radius: 8px; background: #eef9f0; color: #0b6b3a; margin-top: 12px; }
     :host div { margin: 4px 0; }
    `
  ],
  template: `
    <div>
      <div>Total: {{ total }}</div>
      <div>Done: {{ done }}</div>
      <div>Remaining: {{ remaining }}</div>
    </div>
  `
})
export class StatsComponent {
  private _items: Todo[] = [];

  @Input()
  set items(v: Todo[] | undefined) {
    this._items = v || [];
    this.total = this._items.length;
    this.done = this._items.filter(i => i.done).length;
    this.remaining = this._items.filter(i => !i.done).length;
  }
  get items(): Todo[] { return this._items; }

  total = 0;
  done = 0;
  remaining = 0;
}
