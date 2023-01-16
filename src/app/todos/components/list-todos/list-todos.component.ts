import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Observable, switchMap} from "rxjs";
import {Todo} from "../../models/todo";
import {TodoStatus} from "../../models/todo-status";

@Component({
  selector: 'app-list-todos',
  template: `
    <ng-container *ngIf="(todoList$ | async) as todoList">
      <mat-list role="list" *ngIf="todoList.length > 0; else noTodos">
        <mat-list-item role="listitem" *ngFor="let todo of todoList">
          <div>
            {{todo.label}}
            {{todo.description}}
            {{todo.limitDate | date}}
          </div>
          <div>
            <mat-form-field appearance="standard">
              <mat-label>Status</mat-label>
              <mat-select [value]="todo.status" (valueChange)="updateStatus(todo, $event)">
                <mat-option *ngFor="let status of statuses" [value]="status">
                  {{status}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          <div>
            <button mat-raised-button color="warn" (click)="delete(todo)">
              {{'TODOS.LIST.BUTTONS.DELETE' | translate}}
            </button>
            <button mat-raised-button color="primary" [routerLink]="['edit-todo', todo.id]">
              {{'TODOS.LIST.BUTTONS.EDIT' | translate}}
            </button>
          </div>
        </mat-list-item>
      </mat-list>

      <ng-template #noTodos>
        <p>There are no todos</p>
      </ng-template>
    </ng-container>
  `
})
export class ListTodosComponent implements OnInit {
  todoList$: Observable<Todo[]> = this.todoService.todos$
  statuses: TodoStatus[] = Object.values(TodoStatus);

  constructor(
    private todoService: TodoService
  ) {
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe();
  }

  delete(todo: Todo) {
    this.todoService.delete(todo).subscribe();
  }

  updateStatus(todo: Todo, status: TodoStatus): void {
    this.todoService.update({...todo, status}).pipe(
      switchMap(() => this.todoService.getTodos())
    ).subscribe();
  }
}
