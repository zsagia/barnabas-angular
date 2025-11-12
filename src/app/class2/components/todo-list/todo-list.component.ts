import { Component, EventEmitter, Input, Output } from '@angular/core';

type Todo = { text: string; done: boolean };

export type ToggleEvent = { index: number; checked: boolean };

@Component({
  selector: 'app-todo-list',
  standalone: false,
  template: `
    <ul>
      <li *ngFor="let t of items; let i = index">
        <input type="checkbox" [checked]="t.done" (change)="onToggle(i, $event.target.checked)" />
        {{ t.text }}
        <button (click)="onRemove(i)">Törlés</button>
      </li>
    </ul>
  `
})
export class TodoListComponent {
  @Input() items: Todo[] = [];
  @Output() toggle = new EventEmitter<ToggleEvent>();
  @Output() remove = new EventEmitter<number>();

  onToggle(index: number, checked: boolean) {
    this.toggle.emit({ index, checked });
  }

  onRemove(index: number) {
    this.remove.emit(index);
  }
}
