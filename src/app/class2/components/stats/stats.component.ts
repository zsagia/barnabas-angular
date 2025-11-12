import { Component, Input } from '@angular/core';

type Todo = { text: string; done: boolean };

@Component({
  selector: 'app-stats',
  standalone: false,
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
