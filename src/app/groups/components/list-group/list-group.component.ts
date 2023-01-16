import { Component, OnInit } from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {GroupService} from "../../services/group.service";
import {Group} from "../../models/group";
import {Todo} from "../../../todos/models/todo";
import {ListTodosComponent} from "../../../todos/components/list-todos/list-todos.component";

@Component({
  selector: 'app-list-group',
  template: `
    <ng-container *ngIf="(groupList$ | async) as groupList">
      <mat-list role="list" *ngIf="groupList.length > 0; else noGroup">
        <mat-list-item *ngFor="let group of groupList">
          <div>
            <span>Groupe : {{group.label}}</span>

          </div>
          <div>
            <mat-form-field appearance="standard">
              <mat-label>Tâche</mat-label>
              <mat-select [value]="group.todos" (valueChange)="updateTodo(group, $event)">
                <mat-option *ngFor="let todo of group.todos" [value]="todo">
                  {{todo.label | json}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          <div>
            <button mat-raised-button color="primary" [routerLink]="['edit-group', group.id]">
              {{'GROUPS.LIST.BUTTONS.EDIT' | translate}}
            </button>
          </div>
        </mat-list-item>

      </mat-list>

      <ng-template #noGroup>
        <p>There are no group</p>
      </ng-template>
    </ng-container>
  `,
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {

  groupList$: Observable<Group[]> = this.groupService.groups$
  todos: Todo[] = Object.values(ListTodosComponent);

  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.groupService.getGroup().subscribe();
  }

  delete(group: Group) {
    this.groupService.delete(group).subscribe();
  }

  updateTodo(group: Group, todos: Todo[]): void {
    this.groupService.update({...group, todos}).pipe(
      switchMap(() => this.groupService.getGroup())
    ).subscribe();
  }
}
