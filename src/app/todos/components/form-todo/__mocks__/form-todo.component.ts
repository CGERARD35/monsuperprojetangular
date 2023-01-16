import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Todo } from 'src/app/todos/models/todo';

@Component({
  selector: 'app-form-todo',
  template: `app-form-todo mocks`
})
export class MockFormTodoComponent {

  @Input() actionOnGoing: any;
  @Input() todo: any;
  @Output() todoSubmit: EventEmitter<Partial<Todo>> = new EventEmitter<Partial<Todo>>();
}
