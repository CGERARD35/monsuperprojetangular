import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from "../../models/group";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Todo} from "../../../todos/models/todo";

@Component({
  selector: 'app-form-group',
  template: `
    <div class="form-wrapper">
      <form (ngSubmit)="submit()" [formGroup]="form">
        <div class="inputs">
          <mat-form-field appearance="fill">
            <mat-label>Nom</mat-label>
            <input matInput type="text" formControlName="grouplabel">
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
export class FormGroupComponent implements OnInit {

  form!: FormGroup;

  @Input() actionOnGoing: boolean = false;
  @Input() group: Group | null = null;
  @Input() todo: Todo | null = null;
  @Output() groupSubmit: EventEmitter<Partial<Group>> = new EventEmitter<Partial<Group>>()

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      label: this.fb.control(null, [Validators.required]),
      todos: this.fb.control(null,[Validators.required])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  submit() {
    if (this.group !== null) {
      this.groupSubmit.emit({
        ...this.form.value,
        id: this.group.id
      });
    } else {
      this.groupSubmit.emit(this.form.value);
    }
  }

  resetForm() {
    this.initForm();
  }

  canSubmit() {
    return !this.actionOnGoing && this.form.valid;
  }

  private initForm() {
    if (this.group !== null) {
      this.form.reset({
        ...this.group,
          ...this.todo
      });
    }
  }


}
