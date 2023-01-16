import {Group} from "../group";
import {Todo} from "../../../todos/models/todo";

export class GroupImpl implements Group{
  id!: number;
  label: string;
  todos!: Todo[];

  constructor(label: string) {
    this.label = label;
  }

  static fromPartial(partial: Partial<Group>): GroupImpl | null {
    if (partial.label === undefined || partial.label === null) {
      return null;
    }

    const group = new GroupImpl(partial.label);
    if (partial.id !== undefined) {
      group.id = partial.id;
    }

    if (partial.todos !== undefined) {
      group.todos = partial.todos;
    }

    return group;
  }
}
