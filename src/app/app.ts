import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    
  `,
  standalone: false,
  styles: []
})
export class App {
  protected readonly title = signal('barnabas-angular');
}
