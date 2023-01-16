import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListGroupComponent} from "./components/list-group/list-group.component";
import {CreateGroupComponent} from "./components/create-group/create-group.component";
import {ListTodosComponent} from "../todos/components/list-todos/list-todos.component";
import {EditGroupComponent} from "./components/edit-group/edit-group.component";

const routes: Routes = [{
  path: '', component: ListGroupComponent
}, {
  path: 'add-group', component: CreateGroupComponent
},{
  path: 'list-todo', component: ListTodosComponent
},{
  path: 'edit-group/:id', component: EditGroupComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
