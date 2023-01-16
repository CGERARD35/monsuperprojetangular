import {TodoStatus} from "./todo-status";

export interface Todo {
  id: number;
  label: string;
  description: string;
  status: TodoStatus;
  limitDate: Date | null;
}
