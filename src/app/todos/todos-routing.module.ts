import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTodoComponent} from "./components/create-todo/create-todo.component";
import {ListTodosComponent} from "./components/list-todos/list-todos.component";
import {EditTodoComponent} from "./components/edit-todo/edit-todo.component";

const routes: Routes = [{
  path: 'add-todo', component: CreateTodoComponent
}, {
  path: 'list-todo/edit-todo/:id', component: EditTodoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {
}
