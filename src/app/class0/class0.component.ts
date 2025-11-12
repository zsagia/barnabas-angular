import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type Todo = { text: string; done: boolean };

@Component({
  selector: 'app-class0',
  standalone: false,
  styles: [`
    :host { display: block; max-width: 600px; margin: 40px auto; font: 16px/1.4 system-ui, sans-serif; }
    form { display: flex; gap: 8px; margin-bottom: 12px; }
    input[type="text"]{ flex: 1; padding: 8px; }
    button { padding: 8px 12px; cursor: pointer; }
    ul { list-style: none; margin: 0; padding: 0; }
    li { display: flex; align-items: center; gap: 8px; padding: 6px 0; }
    .done .text { text-decoration: line-through; opacity: .6; }
    .spacer { flex: 1; }
    .del { border: none; background: #eee; }
    .counter { margin-top: 8px; color: #555; }
  `],
  template: `
    <h1>Teendők</h1>

    <form (ngSubmit)="add()">
      <input type="text" [(ngModel)]="newText" name="text" placeholder="Új teendő..." />
      <button type="submit">Hozzáad</button>
    </form>

    <ul >
        
      <li *ngFor="let item of items; let i = index" [class.done]="item.done">
        <input type="checkbox" [checked]="item.done" (change)="toggle(i, $event)" />
        <span class="text">{{ item.text }}</span>
        <div class="spacer"></div>
        <button class="del" (click)="remove(i)">Törlés</button>
      </li>
    </ul>

    <div class="counter">Hátralévő: {{ remaining }}</div>
  `
})
export class Class0 {
    @Input() items: Todo[] = [];
    @Output() itemsChange = new EventEmitter<Todo[]>();
      newText = '';
      constructor() {}

  get remaining() { return this.items.filter(i => !i.done).length; }

  add() {
    const text = this.newText.trim();
    if (!text) return;
    this.items = [...this.items, { text, done: false }]; // immutábilis frissítés (jó gyakorlat)
    this.newText = '';
    this.itemsChange.emit(this.items);
  }

  toggle(index: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const next = [...this.items];
    next[index] = { ...next[index], done: checkbox.checked };
    this.items = next;
  }

  remove(index: number) {
    this.items = this.items.filter((_, i) => i !== index);
  }
}
