import {Component} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {TodoImpl} from "../../models/impl/todo-impl";
import {Todo} from "../../models/todo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-todo',
  template: `
    <app-form-todo
      (todoSubmit)="submit($event)"
      [actionOnGoing]="creationOnGoing"
    ></app-form-todo>
  `
})
export class CreateTodoComponent {
  creationOnGoing: boolean = false;

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {
  }

  submit(partialTodo: Partial<Todo>) {
    this.creationOnGoing = true;
    const todo = TodoImpl.fromPartial(partialTodo);
    if (todo === null) {
      console.error('error');
    } else {
      this.todoService.addTodo(todo).subscribe({
        next: (data) => this.afterSubmitSuccess(data),
        error: (err) => this.afterSubmitError(err),
        complete: () => console.info('YEAH !!'),
      });
    }
  }

  private afterSubmitSuccess(data: Todo) {
    this.creationOnGoing = false;
    console.info('SUCCESS !!', data);
    this.router.navigate(['/']).catch(console.error);
  }

  private afterSubmitError(err: any) {
    console.error("[afterSubmitError] ERROR !!", err);
    this.creationOnGoing = false;
  }
}
