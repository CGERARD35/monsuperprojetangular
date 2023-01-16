import { Component, OnInit } from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {Group} from "../../models/group";
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupImpl} from "../../models/impl/group-impl";
import {Todo} from "../../../todos/models/todo";
import {TodoService} from "../../../todos/services/todo.service";

@Component({
  selector: 'app-edit-group',
  template: `
    <div *ngIf="group$ | async as group; else nothingToShow">
      <app-form-group
        (groupSubmit)="submit($event)"
        [actionOnGoing]="updateOnGoing"
        [group]="group"
      ></app-form-group>
      <app-list-todos></app-list-todos>
      <app-edit-todo></app-edit-todo>
    </div>
    <ng-template #nothingToShow>
      <p>Nothing to show</p>
    </ng-template>
  `,
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {

  groupList$: Observable<Group[]> = this.groupService.groups$
  group$!: Observable<Group>;
  updateOnGoing: boolean = false;

  constructor(
    private todoService: TodoService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.group$ = this.groupService.getGroupById(id);
      } else {
        console.error('invalid id');
      }
    });
  }

  submit(partialGroup: Partial<Group>) {
    console.debug('submit', partialGroup);
    this.updateOnGoing = true;
    const group = GroupImpl.fromPartial(partialGroup);
    if (group === null) {
      console.error('error');
    } else {
      this.groupService.update(group).subscribe({
        next: (data) => this.afterSubmitSuccess(data),
        error: (err) => this.afterSubmitError(err),
        complete: () => console.info('Victoire !!'),
      });
    }
  }

  private afterSubmitSuccess(data: Group) {
    this.updateOnGoing = false;
    console.info('SUCCESS !!', data);
    this.router.navigate(['/']).catch(console.error);
  }

  private afterSubmitError(err: any) {
    console.error("[afterSubmitError] ERROR !!", err);
    this.updateOnGoing = false;
  }

  updateTodo(group: Group, todos: Todo[]): void {
    this.groupService.update({...group, todos}).pipe(
      switchMap(() => this.groupService.getGroup())
    ).subscribe();
  }
}
