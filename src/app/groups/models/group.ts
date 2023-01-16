import {Todo} from "../../todos/models/todo";

export interface Group {
  id: number;
  label: string;
  todos: Todo[];
}
