import { Component } from '@angular/core';
import { Todo } from './class0/class0.component';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to {{ title }}!</h1>

    <app-class2></app-class2>
  `,
  standalone: false,
  styles: []
})
export class App {
  protected readonly title = 'barnabas-angular';
  items = [
    { text: 'Angular telepítése', done: false },
    { text: 'Első komponens',     done: true  }
  ]

  itemsChangeHandler(newItems: Todo[]) {
    this.items = newItems
  }
}
