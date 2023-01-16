import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Todo } from 'src/app/todos/models/todo';
import {TodoStatus} from "../../models/todo-status";
import {Group} from "../../../groups/models/group";
import {Observable} from "rxjs";
import {GroupService} from "../../../groups/services/group.service";

@Component({
  selector: 'app-form-todo',
  template: `
    <div class="form-wrapper">
      <form (ngSubmit)="submit()" [formGroup]="form">
        <div class="inputs">
          <mat-form-field appearance="fill" *ngIf="(group$ | async) as groupList">
            <mat-label>Group</mat-label>
            <mat-select formControlName="group">
              <mat-option *ngFor="let group of groupList" [value]="group">
                {{group.label}}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Todo Label</mat-label>
            <input matInput type="text" formControlName="label">
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Todo Description</mat-label>
            <textarea matInput formControlName="description"></textarea>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Todo Status</mat-label>
            <mat-select formControlName="status">
              <mat-option *ngFor="let status of statuses" [value]="status">
                {{status}}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Choose a limit date</mat-label>
            <input [min]="minDate" formControlName="limitDate" matInput [matDatepicker]="picker" >
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </div>
        <div class="buttons">
          <button mat-raised-button color="primary" [disabled]="!canSubmit()">Validate</button>
          <button type="button" mat-raised-button color="warn" (click)="resetForm()" [disabled]="!form.dirty">Reset
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-wrapper {
      margin: 2rem;
      display: flex;
      flex-direction: column;

      .inputs {
        display: flex;
        flex-direction: column;

        .input {
          margin: 0.5rem 0;
        }
      }
    }
  `]
})
export class FormTodoComponent implements OnInit {

  group$: Observable<Group[]> = this.groupService.groups$
  form!: FormGroup;
  statuses: TodoStatus[] = Object.values(TodoStatus);
  minDate: Date = new Date();

  @Input() actionOnGoing: boolean = false;
  @Input() todo: Todo | null = null;
  @Output() todoSubmit: EventEmitter<Partial<Todo>> = new EventEmitter<Partial<Todo>>();

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService
  ) {
    this.form = this.fb.group({
      label: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null),
      status: this.fb.control(null, [Validators.required]),
      limitDate: this.fb.control(null),
      group: this.fb.control(null)
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  submit() {
    if (this.todo !== null) {
      this.todoSubmit.emit({
        ...this.form.value,
        id: this.todo.id
      });
    } else {
      this.todoSubmit.emit(this.form.value);
    }
  }

  resetForm() {
    this.initForm();
  }

  canSubmit() {
    return !this.actionOnGoing && this.form.valid;
  }

  private initForm() {
    if (this.todo !== null) {
      this.form.reset({
        ...this.todo
      });
    } else {
      this.form.reset({
        status: TodoStatus.TODO
      });
    }
  }
}
