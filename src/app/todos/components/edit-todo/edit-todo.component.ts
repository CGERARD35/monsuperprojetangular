import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/todo";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoImpl} from "../../models/impl/todo-impl";

@Component({
  selector: 'app-edit-todo',
  template: `
    <div *ngIf="todo$ | async as todo; else nothingToShow">
      <app-form-todo
        (todoSubmit)="submit($event)"
        [actionOnGoing]="updateOnGoing"
        [todo]="todo"
      ></app-form-todo>
    </div>
    <ng-template #nothingToShow>
      <p>Nothing to show</p>
    </ng-template>
  `
})
export class EditTodoComponent implements OnInit {
  todo$!: Observable<Todo>;
  updateOnGoing: boolean = false;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.todo$ = this.todoService.getTodoById(id);
      } else {
        console.error('Invalid id');
      }
    });
  }

  submit(partialTodo: Partial<Todo>) {
    console.debug('submit', partialTodo);
    this.updateOnGoing = true;
    const todo = TodoImpl.fromPartial(partialTodo);
    if (todo === null) {
      console.error('error');
    } else {
      this.todoService.update(todo).subscribe({
        next: (data) => this.afterSubmitSuccess(data),
        error: (err) => this.afterSubmitError(err),
        complete: () => console.info('YEAH !!'),
      });
    }
  }

  private afterSubmitSuccess(data: Todo) {
    this.updateOnGoing = false;
    console.info('SUCCESS !!', data);
    this.router.navigate(['/']).catch(console.error);
  }

  private afterSubmitError(err: any) {
    console.error("[afterSubmitError] ERROR !!", err);
    this.updateOnGoing = false;
  }
}
