import {BehaviorSubject, of} from "rxjs";
import fn = jest.fn;
import {TodoImpl} from "../../models/impl/todo-impl";
import {Todo} from "../../models/todo";

export const todoServiceMock  = {
  todos$: new BehaviorSubject<Todo[]>([]),
  getTodoById: fn((arg) => of(new TodoImpl('test'))),
  getTodos: fn(() => of([])),
  addTodo: fn((arg) => of(arg)),
  delete: fn((arg) => {}),
  update: fn((arg) => of(arg)),
};
