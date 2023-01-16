import { TodoImpl } from './todo-impl';

describe('TodoImpl', () => {
  it('should create an instance', () => {
    expect(new TodoImpl("test")).toBeTruthy();
  });
});
