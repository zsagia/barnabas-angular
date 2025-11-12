import { Component, EventEmitter, Input, Output } from '@angular/core';

type Todo = { text: string; done: boolean };

export type ToggleEvent = { index: number; checked: boolean };

@Component({
  selector: 'app-todo-list',
  standalone: false,
  styles: [
    `:host ul { padding: 0; margin: 0; }
    :host li { background: #fff6e6; padding: 6px 8px; border-radius: 6px; margin-bottom: 6px; }
    :host li.done { opacity: 0.6; text-decoration: line-through; }
    :host .text { flex: 1; }
    `
  ],
  template: `
    <ul>
      <li *ngFor="let t of items; let i = index; trackBy: trackByIndex" [class.done]="t.done">
        <input type="checkbox" [checked]="t.done" (change)="onToggle(i, $event.target.checked)" />
        <span class="text">{{ t.text }}</span>
        <button class="delete" (click)="onRemove(i)" aria-label="Törlés {{ t.text }}">Törlés</button>
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

  trackByIndex(_: number) {
    return _;
  }
}
