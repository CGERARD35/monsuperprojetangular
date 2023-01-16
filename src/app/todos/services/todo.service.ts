import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Todo} from "../models/todo";
import {HttpClient} from "@angular/common/http";
import {LoaderService} from "../../core/services/loader.service";
import {ToolbarService} from "../../core/services/toolbar.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])

  get todos$(): Observable<Todo[]> {
    return this.todos.asObservable();
  }

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private toolbarService: ToolbarService
  ) {
  }

  getTodoById(id: number): Observable<Todo> {
    this.loaderService.setLoadingState(true)
    return this.http.get<Todo>(`http://localhost:3000/groups/todos/${id}`)
      .pipe(
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  getTodos(): Observable<Todo[]> {
    this.loaderService.setLoadingState(true)
    return this.http.get<Todo[]>(`http://localhost:3000/groups/todos`)
      .pipe(
        tap((data) => this.updateTodos(data)),
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  addTodo(todo: Todo): Observable<Todo> {
    this.loaderService.setLoadingState(true)
    return this.http.post<Todo>('http://localhost:3000/groups/todos', todo)
      .pipe(
        tap(data => this.updateTodos([...this.todos.value, data])),
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  delete(todo: Todo) {
    this.loaderService.setLoadingState(true)
    return this.http.delete(`http://localhost:3000/groups/todos/${todo.id}`)
      .pipe(
        tap(() => this.updateTodos(this.todos.value.filter(t => t.id !== todo.id))),
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  update(todo: Todo): Observable<Todo> {
    this.loaderService.setLoadingState(true)
    return this.http.put<Todo>(`http://localhost:3000/groups/todos/${todo.id}`, todo)
      .pipe(
        tap((data: Todo) => {
          const todos = this.todos.value;
          const index = todos.findIndex(t => t.id === todo.id);
          todos[index] = data;
          this.updateTodos(todos);
        }),
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  private updateTodos(todos: Todo[]) {
    this.todos.next(todos);
    this.toolbarService.setNumberOfTodos(this.todos.value.length);
  }
}
