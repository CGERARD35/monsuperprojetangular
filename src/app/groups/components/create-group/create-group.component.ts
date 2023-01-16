import { Component, OnInit } from '@angular/core';
import {Group} from "../../models/group";
import {Router} from "@angular/router";
import {GroupService} from "../../services/group.service";
import {GroupImpl} from "../../models/impl/group-impl";

@Component({
  selector: 'app-create-group',
  template: `
    <app-form-group
      (groupSubmit)="submit($event)"
      [actionOnGoing]="creationOnGoing"
      ></app-form-group>

  `,
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  creationOnGoing: boolean = false;

  constructor(
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(partialGroup: Partial<Group>) {
    this.creationOnGoing = true;
    const group = GroupImpl.fromPartial(partialGroup);
    if (group === null) {
      console.error('error');
    } else {
      this.groupService.addGroup(group).subscribe({
        next: (data) => this.afterSubmitSuccess(data),
        error: (err) => this.afterSubmitError(err),
        complete: () => console.info('Victoire'),
      });
    }
  }
  private afterSubmitSuccess(data: Group) {
    this.creationOnGoing = false;
    console.info('SUCCESS !!', data);
    this.router.navigate(['/']).catch(console.error);
  }

  private afterSubmitError(err: any) {
    console.error("[afterSubmitError] ERROR !!", err);
    this.creationOnGoing = false;
  }
}
