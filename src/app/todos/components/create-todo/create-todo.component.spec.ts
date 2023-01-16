import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoComponent } from './create-todo.component';
import {todoServiceMock} from "../../services/__mocks__/todo.service";
import {TodoService} from "../../services/todo.service";
import {MockFormTodoComponent} from "../form-todo/__mocks__/form-todo.component";

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateTodoComponent,
        MockFormTodoComponent
      ],
      providers: [
        { provide: TodoService, useValue: todoServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Init test', () => {
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
