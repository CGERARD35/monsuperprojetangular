import {Todo} from "../todo";
import {TodoStatus} from "../todo-status";

export class TodoImpl implements Todo {
  id!: number;
  label: string;
  description!: string;
  limitDate: Date | null = null;
  status: TodoStatus = TodoStatus.TODO;

  constructor(label: string) {
    this.label = label;
  }

  static fromPartial(partial: Partial<Todo>): TodoImpl | null {
    if(partial.label === undefined || partial.label === null) {
      return null;
    }

    const todo = new TodoImpl(partial.label);
    if (partial.id !== undefined) {
      todo.id = partial.id;
    }

    if (partial.description !== undefined) {
      todo.description = partial.description;
    }

    if (partial.limitDate !== undefined) {
      todo.limitDate = partial.limitDate;
    }

    if (partial.status !== undefined) {
      todo.status = partial.status;
    }

    return todo;
  }
}
