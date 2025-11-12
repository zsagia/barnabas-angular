import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Todo = { text: string; done: boolean };

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todos: Todo[] = [
    { text: 'Komponensek használata', done: false },
    { text: 'Adatátadás @Input-tal', done: false },
    { text: 'Komponensek összefűzése', done: true }
  ];

  readonly todos$ = new BehaviorSubject<Todo[]>(this._todos);

  private get snapshot(): Todo[] {
    return this.todos$.getValue();
  }

  add(text: string) {
    const next = [...this.snapshot, { text, done: false }];
    this.todos$.next(next);
  }

  toggle(index: number, checked: boolean) {
    const next = [...this.snapshot];
    next[index] = { ...next[index], done: checked };
    this.todos$.next(next);
  }

  remove(index: number) {
    this.todos$.next(this.snapshot.filter((_, i) => i !== index));
  }
}
