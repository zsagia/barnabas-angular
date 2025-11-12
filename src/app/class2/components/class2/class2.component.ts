import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-class2',
  standalone: false,
  templateUrl: './class2.component.html',
  styleUrls: ['./class2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'class2-host' },
})
export class Class2Component implements OnInit {
  @Input() title = 'Angular komponensek ereje';

  badgeLabel = 'Új!';
  newText = '';
  todos$!: Observable<Todo[]>;

  ngOnInit() {
    this.todos$ = this.todoService.todos$.asObservable();
  }

  constructor(private todoService: TodoService) {}

  add() {
    const text = this.newText.trim();
    if (!text) return;
    this.todoService.add(text);
    this.newText = '';
  }

  toggle(index: number, checked: boolean) {
    this.todoService.toggle(index, checked);
  }

  remove(index: number) {
    this.todoService.remove(index);
  }
}
